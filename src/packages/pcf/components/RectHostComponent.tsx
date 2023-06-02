import * as React from 'react';
import { loadRemoteModule } from '@angular-architects/module-federation';

export interface IReactHostComponentProps { }

class ReactHostComponent extends React.Component<IReactHostComponentProps> {

    state: { Component: React.ComponentType<any> | null };

    constructor(props: IReactHostComponentProps) {
        super(props);
        this.state = { Component: null };
    }

    componentDidMount() {

        loadRemoteModule({
            remoteEntry: 'http://localhost:3001/remoteEntry.js',
            remoteName: 'nav',
            exposedModule: './Header',
        }).then((module) => {
            const Component = module.default;
            this.setState({ Component });
        }).catch(err => console.error('Error loading remote entry', err));
    }

    render() {
        const { Component } = this.state;

        return Component ?
            <React.Suspense fallback={<div />}>
                <Component />
            </React.Suspense> : <div>Loading MFE....</div>;
    }
}

export default ReactHostComponent;
