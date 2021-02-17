import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import styles from './FeedArticleModals.module.css';

export class ViewLink extends Component {

    state = {
        article: null
    }

    async componentDidMount() {
        let {article} = this.props;
        // let resolvedArticleUrl = await this.getResolvedUrl(article.articleUrl);
        // article.articleUrl = resolvedArticleUrl;

        this.setState({
            article: article
        });
    }

    showViewLinkModal = () => {
        if (this.state.article !== null) {
            const ReactSwal = withReactContent(swal);

            ReactSwal.fire({
                title: '',
                html: this.getViewLinkModalContent(),
                allowOutsideClick: false,
                allowEnterKey: false,
                showConfirmButton: false,
                showCancelButton: false,
                showCloseButton: true,
                width: '90%',
                customClass: styles.swalPopup
            })
            .then((value) => {
                if (value.isDismissed) {
                    this.frameElement.src = '';
                }

                this.props.articleCallback();
            });
        }
    }

    getViewLinkModalContent = () => {
        let frameUrl = this.getFrameUrl();

        return (
            <div className={styles.divViewLink}>
                <a href={this.state.article.articleUrl} target="_blank" rel="noopener noreferrer">
                    <p className={`${styles.divViewLinkText} ${styles.truncate}`}>
                        {this.state.article.articleUrl}
                    </p>
                </a>
                <iframe className={styles.divViewLinkFrame} 
                        title="View Link Modal"
                        src={frameUrl} 
                        name="extLinkFrame"
                        ref={el => this.frameElement = el}>
                </iframe>
            </div>
        );
    }

    getFrameUrl = () => {
        let articleId = this.state.article.articleId;
        let articleUrl = this.state.article.articleUrl;
        let frameUrl = '';
                
        if (articleUrl.includes("youtube.com")) {
            frameUrl = articleUrl.replace('watch', 'embed');
        }
        else {
            frameUrl = articleUrl;
        }

        return frameUrl;
    }

    getResolvedUrl = async (enclosureUrl) => {        
        let encodedUrl = encodeURIComponent(enclosureUrl);
        let urlObject = {
            originalUrl: encodedUrl
        };

        let request = new Request('api/rssmedia/resolvedurl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(urlObject)
        });

        let responseJson = await fetch(request)
                                .then((response) => response.json())
                                .catch(error => console.log(error));
                                

        return responseJson.resolvedUrl;
    }

    render() {
        return(
            <div>
                {this.showViewLinkModal()}
            </div>
        );
    }
}