import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
          <div className="bg-[#0A1833] border-2 border-red-500/50 rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl shadow-red-950/50">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 mx-auto mb-4 border border-red-500/30">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2">화면 표시 중 오류 발생</h3>
            <p className="text-xs text-slate-300 mb-6 bg-red-950/30 p-3 rounded-xl border border-red-500/20 text-left font-mono break-all">
              {this.state.error?.message || '리포트 컴포넌트를 렌더링하는 도중 렌더링 오류가 발생했습니다.'}
            </p>

            <button
              onClick={this.handleRetry}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0052A5] to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              메인 화면으로 돌아가기
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
