import React from 'react';
import AccountsUI from './AccountsUI';
import { Button } from 'semantic-ui-react';

export const MainLayout = ({content}) => (
    <div className="main-layout">
    <header>
        <h2> My Resolutions </h2>
        <nav>
            <a href="/"> Resolutions </a>
            <a href="/about"> About </a>
            <AccountsUI />
            <Button primary>Click Here</Button>
            <Button animated='fade'>
                <Button.Content visible>
                    Sign-up for a Pro account
                </Button.Content>
                <Button.Content hidden>
                    $12.99 a month
                </Button.Content>
            </Button>
        </nav>
    </header>
    <main>
        
        {content}
    </main>
    </div>
)