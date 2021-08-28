import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const bannerCard = ({ headerIcon, title, text }) => {
    return (


        <Card className="bannerCard" >

            <Card.Content>
                <Card.Header className="bannerHeader">{title} <div className="bannerIcon">{headerIcon}</div></Card.Header>

                <Card.Description>
                    {text}
                </Card.Description>
            </Card.Content>
        </Card>


        // <Card bg="light" text="dark" style={{ width: '18rem', margin: '10px', textAlign: "center" }}>
        //     <Card.Header>
        //         {headerIcon}
        //         <Card.Title>{title}</Card.Title>
        //     </Card.Header>
        //     <Card.Body>
        //         <Card.Text>{text}</Card.Text>
        //     </Card.Body>
        // </Card>
    )
}

export default bannerCard;

