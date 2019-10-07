import React, { Component } from 'react';
import axios from 'axios';
const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: null, drawn: [] };
        this.drawCard = this.drawCard.bind(this);
    }
    async componentDidMount() {
        let deck = await axios.get(API_URL);
        this.setState({ deck: deck.data });

    }
    async drawCard() {
        let deck_id = this.state.deck.deck_id;
        try {
            let drawUrl = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
            let cardRes = await axios.get(drawUrl);
            if (!cardRes.data.success) {
                throw new Error("No card remaining!")
            }
            let card = cardRes.data.cards[0];
            this.setState(st => ({
                drawn: [
                    ...this.state.drawn,
                    {
                        id: card.code,
                        name: `${card.suit} of ${card.value}`,
                        image: card.image,
                        remaining: cardRes.data.remaining
                    }
                ]
            }));
        } catch (err) {
            alert(err);
        }
    }
    render() {
        return (
            <div>
                <h1>Card Dealer</h1>
                <button onClick={this.drawCard}>GIVE ME A CARD!</button>
                <img src={this.state.drawn.image} />
            </div>
        )
    }
}

export default Deck;