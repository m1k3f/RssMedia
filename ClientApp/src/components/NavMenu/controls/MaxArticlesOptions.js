import React, { Component } from 'react';

export class MaxArticlesOptions extends Component {
    state = {
        defaultOption: null
    }

    // componentDidMount() {
    //     this.setState({
    //         defaultOption: this.props.defaultOption
    //     });
    // }

    handleRadioButtonClick = (e) => {
        const eventTarget = e.target;
        
        let radioButtonOption = (eventTarget.id === 'max20') ? 20 : 50;

        let maxArticlesObject = {
            maxArticles: radioButtonOption
        };

        this.props.settingsCallback(maxArticlesObject);

        this.setState({
            defaultOption: radioButtonOption
        });
    }

    render() {
        let defaultOption = (this.state.defaultOption === null) ? 
                                this.props.defaultOption : 
                                this.state.defaultOption;

        return (
            <React.Fragment>
                <p>Max. Articles:</p>
                <input type="radio" name="maxArticles" id="max20" 
                        checked={defaultOption === 20}
                        onChange={this.handleRadioButtonClick} />
                <label htmlFor="max20">20</label>
                <input type="radio" name="maxArticles" id="max50"
                        checked={defaultOption === 50}
                        onChange={this.handleRadioButtonClick} />
                <label htmlFor="max50">50</label>
            </React.Fragment>
        );
    }
}