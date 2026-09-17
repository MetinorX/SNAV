import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("SNAV app crash:", error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-primary px-4">
          <div className="max-w-md text-center">
            <h1 className="mb-3 font-serif text-3xl font-bold text-primary-foreground">
              SNAV <span className="text-accent">TOURISM</span>
            </h1>
            <p className="mb-2 text-lg font-semibold text-primary-foreground">
              Something went a little off the beaten path.
            </p>
            <p className="mb-6 text-sm text-primary-foreground/70">
              An unexpected error interrupted this page. Reloading usually gets us back on the road.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="/"
                onClick={() => window.location.assign("/")}
                className="inline-flex h-10 items-center rounded-lg bg-accent px-5 text-sm font-bold text-accent-foreground"
              >
                Go to home
              </a>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex h-10 items-center rounded-lg border border-primary-foreground/40 px-5 text-sm font-bold text-primary-foreground"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;