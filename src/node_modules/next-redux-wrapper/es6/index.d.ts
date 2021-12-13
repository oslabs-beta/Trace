/// <reference types="node" />
import App, { AppContext, AppInitialProps } from 'next/app';
import React from 'react';
import { Store } from 'redux';
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext, NextComponentType, NextPageContext } from 'next';
/**
 * Quick note on Next.js return types:
 *
 * Page.getInitialProps https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
 * as-is
 *
 * App.getInitialProps: AppInitialProps https://nextjs.org/docs/advanced-features/custom-app
 * {pageProps: any}
 *
 * getStaticProps https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 * {props: any}
 *
 * getServerSideProps https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * {props: any}
 */
export declare const HYDRATE = "__NEXT_REDUX_WRAPPER_HYDRATE__";
export declare type MakeStore<S extends Store> = (context: Context) => S;
export interface InitStoreOptions<S extends Store> {
    makeStore: MakeStore<S>;
    context: Context;
}
export declare const createWrapper: <S extends Store<any, import("redux").AnyAction>>(makeStore: MakeStore<S>, config?: Config<S>) => {
    getServerSideProps: <P extends {} = any>(callback: GetServerSidePropsCallback<S, P>) => GetServerSideProps<P, import("querystring").ParsedUrlQuery>;
    getStaticProps: <P_1 extends {} = any>(callback: GetStaticPropsCallback<S, P_1>) => GetStaticProps<P_1, import("querystring").ParsedUrlQuery>;
    getInitialAppProps: <P_2 extends {} = any>(callback: AppCallback<S, P_2>) => GetInitialAppProps<P_2>;
    getInitialPageProps: <P_3 extends {} = any>(callback: PageCallback<S, P_3>) => ((context: NextPageContext<any>) => any) | undefined;
    withRedux: (Component: NextComponentType | App | any) => {
        new (props: any, context: any): {
            store: S;
            hydrate({ initialState, initialProps, ...props }: any, context: any): void;
            shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
            render(): JSX.Element;
            context: any;
            setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<any> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<any>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
            componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
        };
        displayName: string;
        getInitialProps: any;
        contextType?: React.Context<any> | undefined;
    };
};
declare const _default: <S extends Store<any, import("redux").AnyAction>>(makeStore: MakeStore<S>, config?: Config<S>) => (Component: any) => {
    new (props: any, context: any): {
        store: S;
        hydrate({ initialState, initialProps, ...props }: any, context: any): void;
        shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
        render(): JSX.Element;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<any> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
    };
    displayName: string;
    getInitialProps: any;
    contextType?: React.Context<any> | undefined;
};
export default _default;
export declare type Context = NextPageContext | AppContext | GetStaticPropsContext | GetServerSidePropsContext;
export interface Config<S extends Store> {
    serializeState?: (state: ReturnType<S['getState']>) => any;
    deserializeState?: (state: any) => ReturnType<S['getState']>;
    debug?: boolean;
}
export interface WrapperProps {
    initialProps: any;
    initialState: any;
}
declare type GetInitialPageProps<P> = NextComponentType<NextPageContext, any, P>['getInitialProps'];
declare type GetInitialAppProps<P> = ({ Component, ctx }: AppContext) => Promise<AppInitialProps & {
    pageProps: P;
}>;
export declare type GetStaticPropsCallback<S extends Store, P> = (store: S) => GetStaticProps<P>;
export declare type GetServerSidePropsCallback<S extends Store, P> = (store: S) => GetServerSideProps<P>;
export declare type PageCallback<S extends Store, P> = (store: S) => GetInitialPageProps<P>;
export declare type AppCallback<S extends Store, P> = (store: S) => GetInitialAppProps<P>;
export declare type Callback<S extends Store, P> = GetStaticPropsCallback<S, P> | GetServerSidePropsCallback<S, P> | PageCallback<S, P> | AppCallback<S, P>;
declare module 'next' {
    interface NextPageContext<S extends Store = any> {
        /**
         * Provided by next-redux-wrapper: The redux store
         */
        store: S;
    }
}
