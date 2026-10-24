import { KNOWLEDGE_BASE } from '../data/knowledgeBase.js';
import { queryKnowledgeBase } from './ledgerEngine.js';

const SYSTEM_INSTRUCTION = `
You are Saathi AI (गिग साथी), an AI legal & rights co-pilot specifically designed for Indian gig delivery workers (Zomato, Swiggy, Zepto, Blinkit).
You speak in simple, respectful, conversational Hinglish (or Hindi/English depending on what the user asks).

CRITICAL GROUNDING RULES:
1. You are strictly grounded in the official Indian labour laws and the following 6 verified Knowledge Base items:
${JSON.stringify(KNOWLEDGE_BASE, null, 2)}

2. Always cite the relevant Knowledge Base ID (e.g. [KB-001], [KB-002], [KB-003], [KB-004], [KB-005], [KB-006]) when discussing rights, social security, deactivations, or insurance.
3. If the user asks about the 90-day / 120-day rule: Explain that under Central Rules (8 May 2026), 90 days with one platform OR 120 days across multiple platforms qualifies them for social security schemes.
4. If the user asks about Ayushman Bharat ₹5 Lakh: Clarify that registration/qualification is active, but funding rollout is underway (never claim they already hold active card if not enrolled).
5. If the user asks about illegal deactivations: Cite [KB-005] that platforms must provide written notice and reasons before algorithmic blocking.
6. If the question is completely out of scope (e.g. unrelated coding, general chit-chat, medical prescriptions), politely refuse and provide verified helplines: 112 (Emergency), 1915 (Consumer Grievance), 14434 (e-Shram).
7. Keep answers concise, actionable, and formatted with bullet points for delivery riders reading on mobile phones.
`;

/**
 * Calls Google Gemini REST API (gemini-2.5-flash or gemini-1.5-flash)
 */
export async function askGeminiAssistant(userQuery, userApiKey = '', lang = 'hinglish') {
  const apiKey = userApiKey || 
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || 
    (typeof localStorage !== 'undefined' && localStorage.getItem('gemini_api_key')) || 
    '';

  const isEn = lang === 'en';

  // If no API key is provided, gracefully fallback to our deterministic grounded engine
  if (!apiKey || apiKey.trim() === '') {
    const localResult = queryKnowledgeBase(userQuery);
    if (localResult.found) {
      return {
        source: 'local_kb',
        text: isEn 
          ? `[Verified Citation: ${localResult.citationId}]\n${localResult.summary}\n\n📌 Legal Status: ${localResult.disclaimer || 'Official Gazette Rules'}\n🔗 Official Gazette Source: ${localResult.sourceUrl}`
          : `【सत्यापित संदर्भ: ${localResult.citationId}】\n${localResult.summary}\n\n📌 कानूनी स्थिति: ${localResult.disclaimer || 'सत्यापित सरकारी नियम'}\n🔗 आधिकारिक स्रोत: ${localResult.sourceUrl}`,
        citationId: localResult.citationId,
        sourceUrl: localResult.sourceUrl
      };
    } else if (localResult.outOfScope) {
      return {
        source: 'local_kb',
        text: isEn
          ? `⚠️ This topic is not covered in our hand-verified legal and scheme database.\n\n${localResult.refusalMessage}\n\nOfficial Contacts:\n${localResult.officialHelplines}`
          : `⚠️ यह विषय हमारे कानूनी डेटाबेस में शामिल नहीं है।\n\n${localResult.refusalMessage}\n\nआधिकारिक संपर्क:\n${localResult.officialHelplines}`,
        citationId: null
      };
    }
    return {
      source: 'local_kb',
      text: localResult.message || (isEn ? "Please describe your question in detail." : "कृपया अपना प्रश्न विस्तार से लिखें।"),
      citationId: null
    };
  }

  // Call Gemini API via official REST endpoint
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;

  const langInstruction = isEn
    ? "IMPORTANT: Respond in clear, accessible, and professional English."
    : lang === 'hi'
      ? "महत्वपूर्ण: सरल, स्पष्ट और सम्मानजनक शुद्ध हिन्दी में उत्तर दें।"
      : "IMPORTANT: Speak in simple, respectful, conversational Hinglish for Indian gig delivery workers.";

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${langInstruction}` }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userQuery }]
          }
        ],
        generationConfig: {
          temperature: 0.3, // Low temperature for high factual accuracy
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      console.warn("Gemini API call returned non-200, falling back to local KB:", errJson);
      throw new Error(errJson.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("No response generated from Gemini");
    }

    return {
      source: 'gemini_api',
      model: 'gemini-2.5-flash',
      text: candidateText.trim()
    };
  } catch (err) {
    console.error("Gemini API error, using grounded fallback:", err);
    // Graceful fallback to verified Knowledge Base
    const fallback = queryKnowledgeBase(userQuery);
    return {
      source: 'fallback_kb',
      error: err.message,
      text: fallback.found 
        ? (isEn
            ? `[Verified Citation: ${fallback.citationId}]\n${fallback.summary}\n\n📌 Legal Status: ${fallback.disclaimer || 'Official Gazette Rules'}\n🔗 Official Gazette Source: ${fallback.sourceUrl}`
            : `【सत्यापित संदर्भ: ${fallback.citationId}】\n${fallback.summary}\n\n📌 कानूनी स्थिति: ${fallback.disclaimer || 'सत्यापित सरकारी नियम'}\n🔗 आधिकारिक स्रोत: ${fallback.sourceUrl}`)
        : (isEn 
            ? `⚠️ ${fallback.refusalMessage || 'Service is temporarily unavailable. Please try again or consult the helplines.'}` 
            : `⚠️ ${fallback.refusalMessage || 'सेवा अभी उपलब्ध नहीं है। कृपया थोड़ी देर बाद प्रयास करें।'}`)
    };
  }
}
