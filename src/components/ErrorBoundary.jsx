import React from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Production telemetry logging can be wired here
    console.error("GigSaathi Crash Boundary Caught Exception:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F4F5F7] text-slate-800 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 text-center space-y-5 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-2xl shadow-sm border border-rose-200">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-900">
                कुछ गलत हो गया / System Alert
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                घबराएं नहीं, आपका कमाई और ट्रिप डेटा सुरक्षित है। कृपया ऐप दोबारा लोड करें।
              </p>
              <p className="text-[11px] text-slate-400">
                Don't worry, your trip logs are safe. Please reload the dashboard.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>दोबारा लोड करें / Reload Dashboard</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-semibold transition-all min-h-[44px]"
              >
                कैश साफ करके शुरू करें (Reset Cache)
              </button>
            </div>

            {this.state.error && (
              <details className="text-left bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[10px] text-slate-500 font-mono overflow-auto max-h-32">
                <summary className="cursor-pointer font-bold text-slate-700">तकनीकी विवरण / Error Stack</summary>
                <p className="mt-1 text-rose-600">{this.state.error.toString()}</p>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
