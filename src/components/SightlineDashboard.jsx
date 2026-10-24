import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Download, Calendar, ChevronDown, TrendingUp, TrendingDown, 
  ArrowUpRight, ArrowRight, Clock, Navigation, Fuel, AlertCircle, CheckCircle2, 
  ShieldCheck, HeartPulse, DollarSign, Command, HelpCircle, Layers, SlidersHorizontal,
  Home, Wallet, FileText, Settings, Award, AlertTriangle, Eye, RefreshCw,
  Volume2, VolumeX, Sparkles, MessageSquare, PhoneCall, Check, ExternalLink,
  Bike, PackageCheck, WalletCards, Coins, ShieldAlert, XCircle, Info,
  Wrench, Send, X, Compass, MapPin
} from 'lucide-react';
import { RIDER_PROFILE, INCOMING_ORDER_SCENARIOS, MOCK_PAYOUT_SLIPS, HISTORICAL_SHIFTS } from '../data/mockData';

const TRANSLATIONS = {
  hinglish: {
    langLabel: 'देसी गिग भाषा (Hinglish)',
    appName: 'गिग साथी (GigSaathi)',
    selectLang: 'भाषा चुनें / Select Language:',
    dailyMenu: 'दैनिक मेनू',
    rightsSafety: 'सरकारी अधिकार व सुरक्षा',
    overview: 'कमाई का हिसाब',
    trips: 'ऑर्डर चेक (फ़ायदा/घाटा)',
    audits: 'कटे पैसे पकड़ो',
    shield: 'सरकारी ₹5 लाख कार्ड',
    ask: 'साथी AI से पूछो',
    newBadge: '1 नया',
    discrepancyBadge: '-₹32',
    daysProgress: '84/90 दिन',
    ayushmanTitle: 'आयुष्मान भारत ₹5 लाख',
    ayushmanSub: 'सरकारी कैशलेस अस्पताल इलाज',
    daysDone: '84 दिन पूरे',
    daysLeft: 'सिर्फ 6 दिन बाकी!',
    viewMobile: 'मोबाइल स्क्रीन देखें (Mobile View)',
    greeting: 'नमस्ते रवि भाई!',
    subGreeting: 'चंडीगढ़ सेक्टर 35 • हीरो स्प्लेंडर 110cc',
    voiceBtnListen: 'बोलकर सुनो (Listen)',
    voiceBtnStop: 'आवाज़ बंद करें (Stop)',
    disputeBtnTop: 'कंपनी को शिकायत भेजो',
    grossTitle: 'कुल कमाई (Gross Payout)',
    grossSub: 'ज़ोमैटो (₹680) + स्विगी (₹440) मिलाके',
    grossBadge: 'ऐप कमाई',
    grossRate: '₹112.0 / घंटा ऐप दर',
    audioGross: 'आज आपकी ज़ोमैटो और स्विगी मिलाकर कुल सकल कमाई 1120 रुपये है।',
    netTitle: 'जेब में क्या बचा? (Real Net)',
    netSub: 'पेट्रोल और बाइक खर्चा काट कर',
    netBadge: '₹69.0 / घंटा असली कमाई',
    totalOf: 'कुल ₹1,120 में से',
    deliveriesTitle: 'आज के कुल ऑर्डर्स',
    deliveriesSub: 'ज़ोमैटो + स्विगी मिलाके',
    today: 'आज',
    ordersUnit: 'ऑर्डर्स',
    deliveriesRate: 'औसतन 2.4 ऑर्डर प्रति घंटा',
    fuelTitle: 'पेट्रोल और बाइक का खर्च',
    fuelBadge: '32% खर्च',
    fuelBreakdown: '₹290 पेट्रोल + ₹80 बाइक घिसाई',
    fuelRate: '₹2.60 प्रति किलोमीटर के हिसाब से',
    underpayTitle: 'कंपनी ने कम दिए (पैसा कटा)',
    underpayBadge: 'चोरी पकड़ी',
    underpayOrder: 'ऑर्डर #ZOM-7782190 में कम दिए',
    underpayDetail: '1.3 किमी का ₹12 + बारिश का ₹20 गायब',
    chartTitle: 'कमाई का सच (ऐप क्या दिखाता है vs जेब में क्या बचता है)',
    appGross: 'ऐप पर दिखा',
    realNet: 'असली बचत जेब में',
    grossLegend: 'ऐप में दिखी कुल कमाई',
    netLegend: 'जेब में बचा असली पैसा (पेट्रोल के बाद)',
    chartExplainer: 'समझने का आसान तरीका: ऊपर की नीली लाइन वो पैसा है जो ऐप ने दिखाया। नीचे की हरी लाइन वो असली पैसा है जो पेट्रोल भरवाने के बाद आपकी जेब में बचा।',
    timeSlots: ['सुबह 11 बजे', 'दोपहर 1 बजे', 'शाम 3 बजे', 'शाम 6 बजे (डिनर रश)', 'रात 8 बजे', 'रात 10 बजे'],
    donutTitle: '₹100 में से कहाँ गया पैसा?',
    donutSub: 'आज का कुल हिसाब',
    donutCenter: 'आपकी जेब में',
    keptNet: 'आपकी जेब में बचा',
    fuelBurn: 'पेट्रोल की टंकी में (@ ₹2.6/किमी)',
    wearCost: 'बाइक घिसाई और सर्विस',
    tripTitle: 'नया ऑर्डर आया: लें या छोड़ें?',
    tripDesc: 'खाली वापसी का पेट्रोल घाटा जोड़कर सही सलाह',
    tripVerdictSkip: 'यह ऑर्डर मत लो (घाटा है!)',
    tripVerdictAccept: 'तुरंत स्वीकार करो (बढ़िया कमाई!)',
    profitBadge: 'फ़ायदा',
    lossBadge: 'घाटा',
    restToCust: 'रेस्टोरेंट से ग्राहक:',
    routeCalc: 'रास्ते का हिसाब:',
    dropDistance: 'किमी ड्रॉप',
    emptyReturn: 'किमी खाली वापसी',
    totalDist: 'कुल',
    fuelRealCost: 'पेट्रोल का असली खर्च:',
    fromPocket: '(जेब से कटेगा)',
    netSavings: 'सब काट के असली बचत:',
    perHour: '/घंटा',
    only: 'सिर्फ',
    declineBtn: 'छोड़ दो (Decline)',
    acceptBtn: 'स्वीकार करो (Accept)',
    alertDeclined: 'ऑर्डर छोड़ दिया। आपने ₹39 का खाली पेट्रोल बचा लिया!',
    alertAccepted: 'ऑर्डर स्वीकार किया। जीपीएस और माइलेज ट्रैकिंग चालू है।',
    auditTitle: 'कटे हुए पैसे पकड़ो (GPS सबूत)',
    auditDesc: 'जोमैटो ने 7.4 किमी की जगह सिर्फ 5.1 किमी का पैसा दिया',
    zomatoTag: 'ज़ोमैटो #ZOM-7782190',
    auditShortfall: 'कंपनी ने ₹32.00 कम दिए (चोरी पकड़ी गई)',
    auditBullet1: 'किमी घटाया: आपने 7.4 किमी बाइक चलाई, कंपनी ने सिर्फ 5.1 किमी माना (-₹12 नुकसान)।',
    auditBullet2: 'बारिश का पैसा गायब: सेक्टर 17 में तेज बारिश थी, फिर भी ₹0 सर्ज दिया (-₹20 नुकसान)।',
    settledByCo: 'कंपनी ने जो दिया (Settled):',
    shouldBePaid: 'असली में जो मिलना चाहिए था:',
    disputeBtn: 'कंपनी को शिकायत भेजो (1-क्लिक व्हाट्सऐप) ↗',
    searchPlaceholder: 'खोजें या पूछें (उदा. 90 दिन नियम, ₹32 शिकायत)...',
    shortcutsTitle: 'ज़रूरी शॉर्टकट',
    shortcut1: '₹32 कम मिलने की शिकायत तैयार करें',
    shortcut2: 'सरकारी ₹5 लाख मुफ्त इलाज (90/120 दिन नियम) देखें',
    shortcut3: 'मोबाइल फोन व्यू खोलें',
    pressEnter: '↵ दबाएं',
    audioOverview: 'नमस्ते रवि भाई! आज आपने कुल 1120 रुपये कमाए, जिसमें से 370 रुपये पेट्रोल और बाइक में गए, और 690 रुपये आपकी असली जेब में बचे।',
    audioTripSkip: 'भाई, यह ऑर्डर मत लो। खरड़ से खाली वापस आने में 39 रुपये का पेट्रोल लगेगा, सिर्फ 13 रुपये बचेंगे। 3 मिनट रुको, अच्छा ऑर्डर आएगा।',
    audioTripAccept: 'यह बहुत बढ़िया ऑर्डर है भाई। पास की दूरी है और 25 रुपये बारिश का बोनस भी है। इसे तुरंत स्वीकार करो।',
    audioAudit: 'सावधान भाई, जोमैटो ने आपके 32 रुपये कम दिए हैं। आपने 7.4 किमी बाइक चलाई लेकिन ऐप ने सिर्फ 5.1 किमी दिखाया। नीचे बटन दबाकर तुरंत शिकायत भेजो।'
  },
  hi: {
    langLabel: 'हिन्दी (सरल हिन्दी)',
    appName: 'गिग साथी (GigSaathi)',
    selectLang: 'भाषा चुनें / Select Language:',
    dailyMenu: 'दैनिक मेनू',
    rightsSafety: 'सरकारी अधिकार व सुरक्षा',
    overview: 'कमाई विवरण',
    trips: 'ऑर्डर रडार (लाभ/हानि)',
    audits: 'कटौती ऑडिट',
    shield: '₹5 लाख सरकारी कवच',
    ask: 'साथी AI सहायता',
    newBadge: '1 नया',
    discrepancyBadge: '-₹32',
    daysProgress: '84/90 दिन',
    ayushmanTitle: 'आयुष्मान भारत ₹5 लाख',
    ayushmanSub: 'सरकारी कैशलेस अस्पताल इलाज',
    daysDone: '84 दिन पूर्ण',
    daysLeft: 'केवल 6 दिन शेष!',
    viewMobile: 'मोबाइल दृश्य देखें (Mobile View)',
    greeting: 'नमस्ते रवि जी!',
    subGreeting: 'चंडीगढ़ सेक्टर 35 • हीरो स्प्लेंडर',
    voiceBtnListen: 'बोलकर सुनें (Listen)',
    voiceBtnStop: 'आवाज़ रोकें (Stop)',
    disputeBtnTop: 'कंपनी को शिकायत भेजें',
    grossTitle: 'कुल कमाई (सकल आय)',
    grossSub: 'ज़ोमैटो (₹680) + स्विगी (₹440) मिलाकर',
    grossBadge: 'सकल राशि',
    grossRate: '₹112.0 / घंटा सकल दर',
    audioGross: 'आज आपकी ज़ोमैटो और स्विगी मिलाकर कुल सकल आय 1120 रुपये है।',
    netTitle: 'आपकी शुद्ध जेब बचत',
    netSub: 'पेट्रोल व वाहन खर्च घटाकर',
    netBadge: '₹69.0 / घंटा शुद्ध आय',
    totalOf: 'कुल ₹1,120 में से',
    deliveriesTitle: 'पूर्ण किए गए ऑर्डर',
    deliveriesSub: 'ज़ोमैटो व स्विगी मिलाकर',
    today: 'आज',
    ordersUnit: 'ऑर्डर',
    deliveriesRate: 'औसतन 2.4 ऑर्डर प्रति घंटा',
    fuelTitle: 'पेट्रोल एवं रखरखाव खर्च',
    fuelBadge: '32% व्यय',
    fuelBreakdown: '₹290 पेट्रोल + ₹80 वाहन घिसावट',
    fuelRate: '₹2.60 प्रति किलोमीटर के आधार पर',
    underpayTitle: 'कंपनी द्वारा कम भुगतान',
    underpayBadge: 'कटौती चिह्नित',
    underpayOrder: 'ऑर्डर #ZOM-7782190 में कम भुगतान',
    underpayDetail: '1.3 किमी कटौती (₹12) + वर्षा भत्ता (₹20) गायब',
    chartTitle: 'सकल आय बनाम जेब में बची शुद्ध बचत',
    appGross: 'सकल आय',
    realNet: 'शुद्ध बचत',
    grossLegend: 'ऐप में दर्ज सकल राशि',
    netLegend: 'शुद्ध बचत (पेट्रोल के बाद)',
    chartExplainer: 'सरल व्याख्या: नीली रेखा ऐप द्वारा दिखाई गई सकल राशि है। हरी रेखा पेट्रोल व रखरखाव के बाद वास्तव में बची शुद्ध राशि है।',
    timeSlots: ['प्रातः 11 बजे', 'दोपहर 1 बजे', 'अपराह्न 3 बजे', 'सायं 6 बजे (डिनर रश)', 'रात्रि 8 बजे', 'रात्रि 10 बजे'],
    donutTitle: '₹100 का पूरा बंटवारा',
    donutSub: 'आज का कुल विवरण',
    donutCenter: 'शुद्ध बचत',
    keptNet: 'सवार की जेब में बचा',
    fuelBurn: 'पेट्रोल में खर्च (@ ₹2.6/किमी)',
    wearCost: 'वाहन घिसावट व सर्विस',
    tripTitle: 'ऑर्डर रडार: स्वीकार करें या छोड़ें?',
    tripDesc: 'खाली वापसी ईंधन का सटीक आंकलन',
    tripVerdictSkip: 'अस्वीकार करें (घाटे का सौदा)',
    tripVerdictAccept: 'तुरंत स्वीकार करें (उत्कृष्ट आय)',
    profitBadge: 'लाभ',
    lossBadge: 'हानि',
    restToCust: 'रेस्टोरेंट से ग्राहक:',
    routeCalc: 'मार्ग विवरण:',
    dropDistance: 'किमी ड्रॉप',
    emptyReturn: 'किमी खाली वापसी',
    totalDist: 'कुल',
    fuelRealCost: 'ईंधन का वास्तविक खर्च:',
    fromPocket: '(जेब से कटेगा)',
    netSavings: 'सब घटाकर शुद्ध बचत:',
    perHour: '/घंटा',
    only: 'केवल',
    declineBtn: 'अस्वीकार करें',
    acceptBtn: 'स्वीकार करें',
    alertDeclined: 'ऑर्डर अस्वीकृत। आपने ₹39 का ईंधन व्यय बचा लिया!',
    alertAccepted: 'ऑर्डर स्वीकृत। जीपीएस व माइलेज ट्रैकिंग सक्रिय।',
    auditTitle: 'वेतन कटौती विवरण व जीपीएस सबूत',
    auditDesc: 'वास्तविक दूरी 7.4 किमी थी, भुगतान केवल 5.1 किमी का हुआ',
    zomatoTag: 'ज़ोमैटो #ZOM-7782190',
    auditShortfall: 'कंपनी द्वारा ₹32.00 का कम भुगतान (जीपीएस विसंगति प्रमाणित)',
    auditBullet1: 'दूरी कटौती: आपने 7.4 किमी यात्रा की, कंपनी ने केवल 5.1 किमी माना (-₹12 हानि)।',
    auditBullet2: 'वर्षा भत्ता गायब: सेक्टर 17 में भारी वर्षा के बावजूद ₹0 सर्ज दिया गया (-₹20 हानि)।',
    settledByCo: 'कंपनी द्वारा प्रदत्त राशि:',
    shouldBePaid: 'वास्तव में देय राशि:',
    disputeBtn: 'औपचारिक शिकायत पत्र तैयार करें ↗',
    searchPlaceholder: 'खोजें या पूछें (उदा. 90 दिन नियम, ₹32 शिकायत)...',
    shortcutsTitle: 'आवश्यक शॉर्टकट',
    shortcut1: '₹32 कटौती हेतु शिकायत पत्र तैयार करें',
    shortcut2: 'आयुष्मान भारत ₹5 लाख सुरक्षा (90/120 दिन नियम) देखें',
    shortcut3: 'मोबाइल फोन दृश्य खोलें',
    pressEnter: '↵ दबाएं',
    audioOverview: 'नमस्ते रवि जी! आज आपकी कुल कमाई 1120 रुपये रही। पेट्रोल खर्च 370 रुपये काटकर शुद्ध बचत 690 रुपये हुई।',
    audioTripSkip: 'कृपया यह ऑर्डर स्वीकार न करें। खरड़ से खाली वापसी में भारी पेट्रोल खर्च होगा।',
    audioTripAccept: 'यह ऑर्डर लाभदायक है, इसमें वर्षा भत्ता भी शामिल है। इसे तुरंत स्वीकार करें।',
    audioAudit: 'जोमैटो ने आपके 32 रुपये कम दिए हैं। कृपया नीचे दिए गए बटन से तुरंत शिकायत दर्ज करें।'
  },
  en: {
    langLabel: 'English (Clear & Professional)',
    appName: 'GigSaathi AI',
    selectLang: 'Select Language:',
    dailyMenu: 'Daily Dashboard',
    rightsSafety: 'Statutory Rights & Protection',
    overview: 'Earnings Overview',
    trips: 'Trip Profit Radar',
    audits: 'Pay Audit Statements',
    shield: 'Govt ₹5L Health Shield',
    ask: 'Ask Saathi AI',
    newBadge: '1 New',
    discrepancyBadge: '-₹32 Shaved',
    daysProgress: '84/90 Days',
    ayushmanTitle: 'Ayushman Bharat ₹5 Lakh',
    ayushmanSub: 'Statutory Cashless Hospitalization',
    daysDone: '84 Days Completed',
    daysLeft: 'Just 6 shifts left to qualify!',
    viewMobile: 'View Mobile Screen (Mobile View)',
    greeting: 'Good afternoon, Ravi',
    subGreeting: 'Chandigarh Sector 35 • Hero Splendor 110cc',
    voiceBtnListen: 'Listen to Briefing',
    voiceBtnStop: 'Stop Audio',
    disputeBtnTop: 'File Dispute Notice',
    grossTitle: 'Total Gross Earnings',
    grossSub: 'Zomato (₹680) + Swiggy (₹440) combined',
    grossBadge: 'App Payout',
    grossRate: '₹112.0 / hr nominal rate',
    audioGross: 'Today your total gross payout across Zomato and Swiggy is 1120 rupees.',
    netTitle: 'Real Net in Pocket',
    netSub: 'After fuel & maintenance deducted',
    netBadge: '₹69.0 / hr effective rate',
    totalOf: 'out of ₹1,120 gross',
    deliveriesTitle: 'Deliveries Completed',
    deliveriesSub: 'Zomato + Swiggy combined',
    today: 'Today',
    ordersUnit: 'Orders',
    deliveriesRate: 'Avg 2.4 orders per hour',
    fuelTitle: 'Operating Fuel & Wear',
    fuelBadge: '32% of Gross',
    fuelBreakdown: '₹290 petrol + ₹80 bike depreciation',
    fuelRate: 'Based on ₹2.60 per kilometer',
    underpayTitle: 'Underpayment Discrepancy',
    underpayBadge: 'Shortfall Flagged',
    underpayOrder: 'Underpaid on Order #ZOM-7782190',
    underpayDetail: '1.3 km shaved (₹12) + missing rain surge (₹20)',
    chartTitle: 'Earnings Truth (App Pay vs Pocket Reality)',
    appGross: 'App Gross',
    realNet: 'Real Net in Pocket',
    grossLegend: 'Gross App Payout',
    netLegend: 'Real Net in Pocket',
    chartExplainer: 'Easy way to understand: The blue line shows gross app payout. The green line shows what actually remained in your pocket after fuel & maintenance.',
    timeSlots: ['11:00 AM', '1:00 PM', '3:00 PM', '6:00 PM (Dinner Rush)', '8:00 PM', '10:00 PM'],
    donutTitle: 'Where Does Every ₹100 Go?',
    donutSub: "Today's Total Breakdown",
    donutCenter: 'In Pocket',
    keptNet: 'Kept in Pocket',
    fuelBurn: 'Fuel Burn (@ ₹2.6/km)',
    wearCost: 'Bike Wear & Maintenance',
    tripTitle: 'Incoming Order: Accept or Skip?',
    tripDesc: 'Calculates empty return fuel trap before accepting',
    tripVerdictSkip: 'SKIP ORDER (Deadhead Trap!)',
    tripVerdictAccept: 'ACCEPT ORDER (High Net Profit!)',
    profitBadge: 'Profit',
    lossBadge: 'Loss',
    restToCust: 'Restaurant to Customer:',
    routeCalc: 'Trip Distance Math:',
    dropDistance: 'km drop',
    emptyReturn: 'km empty return',
    totalDist: 'total',
    fuelRealCost: 'Real Fuel Cost:',
    fromPocket: '(out-of-pocket fuel)',
    netSavings: 'Real Net Profit:',
    perHour: '/hr',
    only: 'only',
    declineBtn: 'Decline Order',
    acceptBtn: 'Accept Trip',
    alertDeclined: 'Order declined. You saved ₹39 in deadhead return fuel!',
    alertAccepted: 'Order accepted. GPS and mileage verification active.',
    auditTitle: 'Shortfall Caught (GPS Evidence)',
    auditDesc: 'Zomato credited 5.1 km instead of 7.4 km actual',
    zomatoTag: 'Zomato #ZOM-7782190',
    auditShortfall: 'Company underpaid ₹32.00 (GPS discrepancy confirmed)',
    auditBullet1: 'Shaved Distance: You rode 7.4 km, platform only credited 5.1 km (-₹12 loss).',
    auditBullet2: 'Missing Rain Surge: Heavy rain in Sector 17, but ₹0 rain surge credited (-₹20 loss).',
    settledByCo: 'What Platform Settled:',
    shouldBePaid: 'What Should Have Been Paid:',
    disputeBtn: 'Send Grievance Notice (1-Tap WhatsApp) ↗',
    searchPlaceholder: 'Search or ask (e.g. 90-day rule, ₹32 dispute)...',
    shortcutsTitle: 'Essential Shortcuts',
    shortcut1: 'Draft ₹32 underpayment dispute notice',
    shortcut2: 'Check Govt ₹5 Lakh Ayushman Cover (90/120 day rules)',
    shortcut3: 'Open Rider Mobile Phone View',
    pressEnter: 'Press ↵',
    audioOverview: 'Good afternoon Ravi. Today you earned 1120 gross. After deducting 370 rupees for petrol and maintenance, your real pocket savings are 690 rupees.',
    audioTripSkip: 'Do not take this order Ravi. The empty return trip from Kharar eats 39 rupees of fuel, leaving you only 13 rupees profit.',
    audioTripAccept: 'This is a great order. Short distance and 25 rupees rain bonus included. Accept it right away.',
    audioAudit: 'Zomato shortchanged you by 32 rupees on this order. Click the dispute button to send a notice.'
  }
};

export default function SightlineDashboard({ 
  onOpenAppeal, 
  onOpenAskAI, 
  onSwitchToMobile,
  currentLang: externalLang,
  setCurrentLang: externalSetLang
}) {
  const [internalLang, setInternalLang] = useState('hinglish');
  const currentLang = externalLang || internalLang;
  const setCurrentLang = externalSetLang || setInternalLang;

  const [selectedRange, setSelectedRange] = useState('Today');
  const [comparePrevious, setComparePrevious] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState('overview');
  const [selectedOrderIdx, setSelectedOrderIdx] = useState(0);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [speakingText, setSpeakingText] = useState(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const order = INCOMING_ORDER_SCENARIOS[selectedOrderIdx];
  const isSkip = order.verdict === 'SKIP';

  // Localized Scenario Reasons
  const getOrderReason = (sc) => {
    if (currentLang === 'en') {
      return sc.reason;
    }
    if (currentLang === 'hi') {
      if (sc.id === 'ord-1') return 'खरड़ से 6.5 किमी खाली वापसी में कमाई का 74% ईंधन में नष्ट होगा। शुद्ध दर केवल ₹19/घंटा है। कृपया प्रतीक्षा करें।';
      if (sc.id === 'ord-2') return 'न्यूनतम वापसी दूरी एवं ₹25 वर्षा भत्ता। ₹166/घंटा शुद्ध आय। तुरंत स्वीकार करने हेतु अनुशंसित।';
      if (sc.id === 'ord-3') return '₹20 वर्षा सर्ज के साथ संतुलित ऑर्डर। ईंधन व्यय के पश्चात उत्कृष्ट शुद्ध लाभ।';
    }
    // Hinglish default
    if (sc.id === 'ord-1') return '6.5 किमी खाली वापसी में 74% पैसा पेट्रोल में जल जाएगा। सिर्फ ₹19/घंटा बचेगा। 3 मिनट रुको, सेक्टर 22 का अच्छा ऑर्डर आएगा।';
    if (sc.id === 'ord-2') return 'पास की दूरी और ₹25 का सर्ज बोनस! ₹166/घंटा असली कमाई बनेगी। तुरंत ले लो भाई!';
    if (sc.id === 'ord-3') return 'बारिश का ₹20 सर्ज मिल रहा है और वापसी की दूरी कम है। यह बढ़िया मुनाफे का ऑर्डर है।';
    return sc.reason;
  };

  // Voice Speech Synthesizer Function
  const speakText = (textKey, fallbackText) => {
    if (!('speechSynthesis' in window)) return;
    
    if (speakingText === textKey) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(fallbackText || t[textKey]);
    utterance.lang = currentLang === 'en' ? 'en-IN' : 'hi-IN';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setSpeakingText(textKey);
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);

    window.speechSynthesis.speak(utterance);
  };

  // Keyboard shortcut listener for Command/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-[#F4F5F7] min-h-screen text-slate-800 antialiased font-sans selection:bg-slate-900 selection:text-white">
      {/* Outer Studio Container */}
      <div className="max-w-[1560px] mx-auto p-3 sm:p-6 lg:p-8">
        
        {/* Main Dashboard Frame */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row min-h-[900px]">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR (Rider Navigation) */}
          {/* ========================================================= */}
          <aside className="w-full lg:w-64 border-r border-slate-100 p-5 flex flex-col justify-between shrink-0 bg-slate-50/50">
            <div className="space-y-6">
              {/* App Brand Header */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-black shadow-xs ring-1 ring-slate-800">
                    <Bike className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">{t.appName}</h2>
                    <span className="text-[11px] text-slate-500 font-medium">{t.subGreeting.split('•')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Language Selector Pill in Sidebar */}
              <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block pt-1">
                  {t.selectLang}
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { key: 'hinglish', label: 'Hinglish' },
                    { key: 'hi', label: 'हिन्दी' },
                    { key: 'en', label: 'English' },
                  ].map((l) => (
                    <button
                      key={l.key}
                      onClick={() => setCurrentLang(l.key)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentLang === l.key 
                          ? 'bg-slate-900 text-white shadow-xs' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Sections */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
                    {t.dailyMenu}
                  </span>
                  
                  <button
                    onClick={() => setActiveSidebarItem('overview')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activeSidebarItem === 'overview'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Home className="w-4 h-4 text-emerald-400" />
                      <span>{t.overview}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSidebarItem('trips')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activeSidebarItem === 'trips'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Navigation className="w-4 h-4 text-amber-500" />
                      <span>{t.trips}</span>
                    </div>
                    <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                      {t.newBadge}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveSidebarItem('audits')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activeSidebarItem === 'audits'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-rose-500" />
                      <span>{t.audits}</span>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-mono font-bold">
                      {t.discrepancyBadge}
                    </span>
                  </button>
                </div>

                {/* Section 2: Statutory Protection */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
                    {t.rightsSafety}
                  </span>

                  <button
                    onClick={() => onOpenAskAI(currentLang === 'en' ? "What is the 90 or 120-day rule for social security?" : "सामाजिक सुरक्षा के लिए 90 या 120 दिन का क्या नियम है?")}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{t.shield}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-mono font-bold">
                      {t.daysProgress}
                    </span>
                  </button>

                  <button
                    onClick={() => onOpenAskAI()}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span>{t.ask}</span>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-bold">
                      AI
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Card: Ayushman Bharat Progress */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-4 space-y-2.5 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">{t.ayushmanTitle}</h4>
                    <p className="text-[10px] text-emerald-800 font-medium">{t.ayushmanSub}</p>
                  </div>
                </div>

                <div className="w-full bg-emerald-200/80 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: '93%' }} />
                </div>

                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-600">{t.daysDone}</span>
                  <span className="text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-mono">{t.daysLeft}</span>
                </div>

                <button 
                  onClick={onSwitchToMobile}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 mt-1"
                >
                  <span>{t.viewMobile}</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* MAIN STAGE CONTENT (Plain-Speak Rider Dashboard) */}
          {/* ========================================================= */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
            
            {/* Top Greeting & Voice Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active Shift</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {t.subGreeting}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    {t.greeting}
                  </h1>
                  
                  {/* High-Tech Sleek Audio Pill Button */}
                  <button
                    onClick={() => speakText('audioOverview', t.audioOverview)}
                    title={speakingText === 'audioOverview' ? t.voiceBtnStop : t.voiceBtnListen}
                    className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs active:scale-95 ${
                      speakingText === 'audioOverview'
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                        : 'bg-slate-900 hover:bg-slate-800 text-white ring-1 ring-slate-950/10'
                    }`}
                  >
                    {speakingText === 'audioOverview' ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    )}
                    <span>{speakingText === 'audioOverview' ? t.voiceBtnStop : t.voiceBtnListen}</span>
                    {speakingText === 'audioOverview' && (
                      <span className="flex items-center gap-0.5 ml-1">
                        <span className="w-0.5 h-2.5 bg-slate-950 animate-pulse" />
                        <span className="w-0.5 h-3.5 bg-slate-950 animate-pulse delay-75" />
                        <span className="w-0.5 h-2 bg-slate-950 animate-pulse delay-150" />
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Top Controls: Language Switcher & Dispute Button */}
              <div className="flex items-center flex-wrap gap-2.5">
                
                {/* 1-Tap Language Quick Switcher */}
                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-1 text-xs font-bold text-slate-700 shadow-inner">
                  <button
                    onClick={() => setCurrentLang('hinglish')}
                    className={`px-3 py-1.5 rounded-full transition-all ${
                      currentLang === 'hinglish' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    Hinglish
                  </button>
                  <button
                    onClick={() => setCurrentLang('hi')}
                    className={`px-3 py-1.5 rounded-full transition-all ${
                      currentLang === 'hi' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => setCurrentLang('en')}
                    className={`px-3 py-1.5 rounded-full transition-all ${
                      currentLang === 'en' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900'
                    }`}
                  >
                    English
                  </button>
                </div>

                {/* Complaint Action Button */}
                <button 
                  onClick={() => onOpenAppeal(MOCK_PAYOUT_SLIPS[0])}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold shadow-xs transition-all active:scale-95"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{t.disputeBtnTop}</span>
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 5 TOP RIDER KPI CARDS (Linear/Fintech-grade Design) */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              
              {/* Card 1: Total Gross Earnings (App Payout) */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-blue-200 hover:shadow-sm transition-all space-y-3 relative overflow-hidden group">
                <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
                  <span className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20 flex items-center justify-center shrink-0">
                      <WalletCards className="w-4 h-4" />
                    </div>
                    <span className="text-slate-900">{t.grossTitle}</span>
                  </span>
                  <button
                    onClick={() => speakText('audioGross', t.audioGross)}
                    title={t.voiceBtnListen}
                    className={`p-1.5 rounded-lg transition-all ${
                      speakingText === 'audioGross'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                    ₹1,120<span className="text-base text-slate-400 font-semibold">.00</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.grossRate}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.grossSub}
                  </p>
                </div>
              </div>

              {/* Card 2: Real Net Take-Home */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-emerald-200 hover:shadow-sm transition-all space-y-3 relative overflow-hidden group">
                <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
                  <span className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20 flex items-center justify-center shrink-0">
                      <Coins className="w-4 h-4" />
                    </div>
                    <span className="text-slate-900">{t.netTitle}</span>
                  </span>
                  <button
                    onClick={() => speakText('audioOverview', t.audioOverview)}
                    title={t.voiceBtnListen}
                    className={`p-1.5 rounded-lg transition-all ${
                      speakingText === 'audioOverview'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tracking-tight">
                    ₹690<span className="text-base text-emerald-700/60 font-semibold">.00</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.netBadge}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.netSub}
                  </p>
                </div>
              </div>

              {/* Card 3: Operating Fuel & Bike Wear */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-rose-200 hover:shadow-sm transition-all space-y-3 relative overflow-hidden group">
                <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
                  <span className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-500/20 flex items-center justify-center shrink-0">
                      <Fuel className="w-4 h-4" />
                    </div>
                    <span className="text-slate-900">{t.fuelTitle}</span>
                  </span>
                  <span className="font-mono text-[11px] text-rose-700 font-bold bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-md">{t.fuelBadge}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-mono tracking-tight">
                    -₹370<span className="text-base font-semibold text-rose-400">.00</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-50/60 text-rose-700 text-xs font-semibold">
                    <span>{t.fuelBreakdown}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">{t.fuelRate}</p>
                </div>
              </div>

              {/* Card 4: Deliveries Completed */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all space-y-3 relative overflow-hidden group">
                <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
                  <span className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/20 flex items-center justify-center shrink-0">
                      <PackageCheck className="w-4 h-4" />
                    </div>
                    <span className="text-slate-900">{t.deliveriesTitle}</span>
                  </span>
                  <span className="font-mono text-[11px] bg-slate-100 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md font-bold">{t.today}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                    16 <span className="text-base font-semibold text-slate-500 font-sans">{t.ordersUnit}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                    <span>{t.deliveriesRate}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">{t.deliveriesSub}</p>
                </div>
              </div>

              {/* Card 5: Underpayment & Anomaly Flags */}
              <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-xs hover:border-rose-300 hover:shadow-sm transition-all space-y-3 relative overflow-hidden group bg-gradient-to-b from-rose-50/20 to-white">
                <div className="flex items-center justify-between text-xs text-rose-900 font-bold">
                  <span className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/20 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <span className="text-rose-950">{t.underpayTitle}</span>
                  </span>
                  <span className="font-mono text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider shadow-xs">{t.underpayBadge}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-mono tracking-tight">
                    -₹32<span className="text-base font-semibold text-rose-400">.00</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-xs font-semibold">
                    <span>{t.underpayOrder}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    {t.underpayDetail}
                  </p>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* MIDDLE SECTION: EARNINGS CURVE VS DONUT BREAKDOWN */}
            {/* ========================================================= */}
            <div className="grid grid-cols-12 gap-6 items-stretch">
              
              {/* Dual-Curve Earnings vs Expenses Chart */}
              <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{t.chartTitle}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-slate-900 font-mono">₹1,120</span>
                      <span className="text-xs font-semibold text-slate-500">({t.appGross})</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 self-center" />
                      <span className="text-2xl font-extrabold text-emerald-600 font-mono">₹690</span>
                      <span className="text-xs font-bold text-emerald-700">({t.realNet})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-blue-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> {t.grossLegend}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {t.netLegend}
                    </span>
                  </div>
                </div>

                {/* Plain-language Explainer Banner */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-2.5 text-xs text-slate-700">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <span>{t.chartExplainer}</span>
                </div>

                {/* Smooth Multi-Wave Graph */}
                <div className="pt-2 h-44 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="emeraldFade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 0 90 Q 75 40 150 70 T 300 35 T 450 65 T 600 20 L 600 120 L 0 120 Z"
                      fill="url(#emeraldFade)"
                    />
                    
                    {/* Blue Curve (Gross) */}
                    <path
                      d="M 0 90 Q 75 40 150 70 T 300 35 T 450 65 T 600 20"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Green Curve (Real Net in Pocket) */}
                    <path
                      d="M 0 105 Q 75 65 150 90 T 300 65 T 450 85 T 600 50"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <circle cx="300" cy="35" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="300" cy="65" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
                  </svg>

                  {/* Horizontal X-Axis */}
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-100">
                    {t.timeSlots.map((slot, sIdx) => (
                      <span key={sIdx} className={sIdx === 3 ? "text-slate-900 font-bold" : ""}>
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Donut Chart: Plain Explanation */}
              <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-800">{t.donutTitle}</h3>
                    <span className="text-[11px] font-mono text-emerald-600 font-bold">{t.donutSub}</span>
                  </div>

                  {/* SVG Donut Circle */}
                  <div className="py-4 flex items-center justify-center relative">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        {/* Net (62%) */}
                        <circle
                          cx="50" cy="50" r="38"
                          fill="transparent"
                          stroke="#10B981"
                          strokeWidth="10"
                          strokeDasharray="148 238"
                          strokeDashoffset="0"
                        />
                        {/* Fuel (26%) */}
                        <circle
                          cx="50" cy="50" r="38"
                          fill="transparent"
                          stroke="#F43F5E"
                          strokeWidth="10"
                          strokeDasharray="66 238"
                          strokeDashoffset="-148"
                        />
                        {/* Wear (12%) */}
                        <circle
                          cx="50" cy="50" r="38"
                          fill="transparent"
                          stroke="#F59E0B"
                          strokeWidth="10"
                          strokeDasharray="24 238"
                          strokeDashoffset="-214"
                        />
                      </svg>
                      {/* Center label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-extrabold font-mono text-emerald-600 leading-none">62%</span>
                        <span className="text-[10px] text-slate-500 font-bold mt-1">{t.donutCenter}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plain Legend list with Clean Micro-Badges */}
                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all">
                    <div className="flex items-center gap-2 text-slate-800 font-bold">
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{t.keptNet}</span>
                    </div>
                    <span className="font-mono font-extrabold text-emerald-700">₹690.00 <span className="text-[10px] text-slate-400 font-normal">(62%)</span></span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-rose-200 transition-all">
                    <div className="flex items-center gap-2 text-slate-800 font-bold">
                      <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                        <Fuel className="w-3.5 h-3.5" />
                      </div>
                      <span>{t.fuelBurn}</span>
                    </div>
                    <span className="font-mono font-extrabold text-rose-600">-₹290.00 <span className="text-[10px] text-slate-400 font-normal">(26%)</span></span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all">
                    <div className="flex items-center gap-2 text-slate-800 font-bold">
                      <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Wrench className="w-3.5 h-3.5" />
                      </div>
                      <span>{t.wearCost}</span>
                    </div>
                    <span className="font-mono font-extrabold text-amber-700">-₹140.00 <span className="text-[10px] text-slate-400 font-normal">(12%)</span></span>
                  </div>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* BOTTOM SECTION: TRIP RADAR + AUDIT DISPUTE TABLE */}
            {/* ========================================================= */}
            <div className="grid grid-cols-12 gap-6 items-stretch">
              
              {/* Left: Incoming Opportunity Evaluator (Trip Radar) */}
              <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        <Compass className="w-4 h-4 text-slate-700" />
                        {t.tripTitle}
                      </h3>
                      <button
                        onClick={() => speakText(
                          isSkip ? 'audioTripSkip' : 'audioTripAccept',
                          isSkip ? t.audioTripSkip : t.audioTripAccept
                        )}
                        title={t.voiceBtnListen}
                        className={`p-1.5 rounded-lg transition-all ${
                          speakingText === (isSkip ? 'audioTripSkip' : 'audioTripAccept')
                            ? 'bg-amber-500 text-slate-950'
                            : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{t.tripDesc}</p>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shadow-xs ${
                    isSkip 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {isSkip ? <XCircle className="w-3.5 h-3.5 text-rose-600" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{isSkip ? t.tripVerdictSkip : t.tripVerdictAccept}</span>
                  </span>
                </div>

                {/* Scenario switcher tabs */}
                <div className="grid grid-cols-3 gap-2">
                  {INCOMING_ORDER_SCENARIOS.map((sc, idx) => (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedOrderIdx(idx)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedOrderIdx === idx
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold">{sc.platform}</span>
                        <span className={`font-extrabold ${sc.verdict === 'ACCEPT' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {sc.verdict === 'ACCEPT' ? t.profitBadge : t.lossBadge}
                        </span>
                      </div>
                      <p className="font-bold truncate mt-1">{sc.restaurant.split('(')[0]}</p>
                      <p className="text-[10px] opacity-80 font-mono">₹{sc.offeredPayout} • {sc.oneWayDistanceKm}km</p>
                    </button>
                  ))}
                </div>

                {/* Plain-language Math Box */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">{t.restToCust}</span>
                    <span className="font-bold text-slate-800">{order.restaurant} &rarr; {order.dropLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">{t.routeCalc}</span>
                    <span className="font-mono text-slate-800">
                      {order.oneWayDistanceKm} {t.dropDistance} + <strong className="text-rose-600">{order.deadheadReturnKm} {t.emptyReturn}</strong> = {t.totalDist} {order.totalDistanceKm} km
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">{t.fuelRealCost}</span>
                    <span className="font-mono font-bold text-rose-600">-₹{order.realFuelCost.toFixed(0)} {t.fromPocket}</span>
                  </div>
                  
                  {/* Verdict Row */}
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold">
                    <span>{t.netSavings}</span>
                    <span className={`font-mono text-base ${isSkip ? 'text-rose-600' : 'text-emerald-600'}`}>
                      ₹{order.netProfit.toFixed(1)} ({t.only} ₹{order.effectiveHourlyRate.toFixed(1)}{t.perHour})
                    </span>
                  </div>

                  {/* Rider Guidance in spoken words */}
                  <div className={`p-2.5 rounded-lg text-xs leading-relaxed font-medium mt-1 ${
                    isSkip ? 'bg-rose-100/70 text-rose-900 border border-rose-200' : 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
                  }`}>
                    {getOrderReason(order)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button 
                    onClick={() => alert(t.alertDeclined)}
                    className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs transition-all border border-slate-200 flex items-center justify-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.declineBtn}</span>
                  </button>
                  <button 
                    onClick={() => alert(t.alertAccepted)}
                    className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.acceptBtn}</span>
                  </button>
                </div>
              </div>

              {/* Right: Pay Audit Statement & 1-Click Grievance Draft */}
              <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 text-rose-600" />
                          {t.auditTitle}
                        </h3>
                        <button
                          onClick={() => speakText('audioAudit', t.audioAudit)}
                          title={t.voiceBtnListen}
                          className={`p-1.5 rounded-lg transition-all ${
                            speakingText === 'audioAudit'
                              ? 'bg-amber-500 text-slate-950'
                              : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{t.auditDesc}</p>
                    </div>

                    <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      {t.zomatoTag}
                    </span>
                  </div>

                  <div className="space-y-3 pt-3">
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{t.auditShortfall}</span>
                      </div>
                      <div className="text-slate-700 text-xs space-y-1.5 pl-6">
                        <div className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>{t.auditBullet1}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>{t.auditBullet2}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1.5 font-medium">
                      <div className="flex justify-between text-slate-600">
                        <span>{t.settledByCo}</span>
                        <span className="font-mono font-bold text-slate-900">₹50.00</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>{t.shouldBePaid}</span>
                        <span className="font-mono font-extrabold text-emerald-600 text-sm">₹82.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onOpenAppeal(MOCK_PAYOUT_SLIPS[0])}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.disputeBtn}</span>
                </button>
              </div>

            </div>

          </main>

        </div>

      </div>

      {/* ========================================================= */}
      {/* COMMAND PALETTE MODAL (⌘K) */}
      {/* ========================================================= */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-start justify-center pt-24 p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden text-slate-800 space-y-2">
            <div className="p-3 border-b border-slate-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full text-xs outline-none bg-transparent placeholder-slate-400"
              />
              <kbd className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                ESC
              </kbd>
            </div>

            <div className="p-2 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                {t.shortcutsTitle}
              </span>
              <button 
                onClick={() => {
                  onOpenAppeal();
                  setCommandPaletteOpen(false);
                }}
                className="w-full p-2 rounded-lg text-left hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between font-bold transition-all"
              >
                <span>{t.shortcut1}</span>
                <span className="text-[10px] text-slate-400 font-mono">{t.pressEnter}</span>
              </button>

              <button 
                onClick={() => {
                  onOpenAskAI(currentLang === 'en' ? "What is the 90 or 120-day rule for social security?" : "सामाजिक सुरक्षा के लिए 90 या 120 दिन का क्या नियम है?");
                  setCommandPaletteOpen(false);
                }}
                className="w-full p-2 rounded-lg text-left hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between font-bold transition-all"
              >
                <span>{t.shortcut2}</span>
                <span className="text-[10px] text-slate-400 font-mono">{t.pressEnter}</span>
              </button>

              <button 
                onClick={() => {
                  onSwitchToMobile();
                  setCommandPaletteOpen(false);
                }}
                className="w-full p-2 rounded-lg text-left hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between font-bold transition-all"
              >
                <span>{t.shortcut3}</span>
                <span className="text-[10px] text-slate-400 font-mono">{t.pressEnter}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
