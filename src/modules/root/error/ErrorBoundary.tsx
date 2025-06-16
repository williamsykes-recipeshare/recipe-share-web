import React, { ErrorInfo } from 'react';
import { IErrorInformation } from '../../../models/errorInformation';
import { VERSION } from '../../../version';
import HttpLoggerService from '../../../services/http/loggerService';
import ErrorPage from './ErrorPage';

interface IErrorBoundaryProps {
    children : React.ReactNode;
}

interface IErrorBoundaryState {
    hasError : boolean;
    errorInformation ?: IErrorInformation;
}

/**
 * Error boundried do not support hooks as of yet.
 */
export default class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props : IErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    public static getDerivedStateFromError() : IErrorBoundaryState {
        return { hasError: true };
    }

    public componentDidCatch(error : Error, errorInfo : ErrorInfo) : void {
        const info : IErrorInformation = {
            id: null,
            version: VERSION.version,
            commitHash: VERSION.hash,
            environment: process.env.NODE_ENV ?? null,
            path: window.location.href,
            name: error.name,
            message: error.message,
            stack: error.stack ?? null,
            componentStack: errorInfo.componentStack ?? null,
            date: new Date().valueOf(),
        };

        if (process.env.NODE_ENV === 'production') {
            HttpLoggerService.log(info);
        }

        this.setState({
            errorInformation: info,
        });

    }

    // TODO: Log error? Analytics maybe?

    public render() : React.ReactNode {
        if (this.state.hasError) {
            return <ErrorPage errorInformation={this.state.errorInformation} />;
        }

        return this.props.children;
    }
}