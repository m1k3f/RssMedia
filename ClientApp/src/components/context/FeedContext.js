import React, { Component } from 'react';

const FeedContext = React.createContext();

//export const FeedConsumer = FeedContext.Consumer;

class FeedProvider extends Component {
    state = {
        selectedFeed: {}
    }

    setFeed = (feed) => {
        this.setState({
            selectedFeed: feed
        });
    }

    render() {
        const { children } = this.props
        const { selectedFeed } = this.state
        const { setFeed } = this

        return (
            <FeedContext.Provider 
                value={
                    {
                        selectedFeed,
                        setFeed
                    }
                }
                >
                {children}
            </FeedContext.Provider>
        );
    }
}

export default FeedContext;
export { FeedProvider };