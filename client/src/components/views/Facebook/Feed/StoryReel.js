import React from 'react';
import Story from './Story';
import './storyReel.css';
const image = require("../../../../assets/images/Penguins.jpg");
const profileSrc = require("../../../../assets/images/project-1.jpg");

function StoryReel() {
    return (
        <div className="storyReel">
            {/* Story */}
            <Story image={image} profileSrc={profileSrc} title="Nelson Fenandez"/>
            <Story image={profileSrc} profileSrc={image} title="liza Fenandez"/>
            <Story image={profileSrc} profileSrc={image} title="cristel Fenandez"/>
            <Story image={image} profileSrc={profileSrc} title="Nelson Fenandez"/>
            <Story image={profileSrc} profileSrc={image} title="liza Fenandez"/>
            <Story image={profileSrc} profileSrc={image} title="cristel Fenandez"/>
            <Story image={profileSrc} profileSrc={image} title="liza Fenandez"/>
            <Story image={profileSrc} profileSrc={image} title="cristel Fenandez"/>
            <Story image={image} profileSrc={profileSrc} title="Nelson Fenandez"/>
            <Story image={profileSrc} profileSrc={image} title="liza Fenandez"/>
            <Story image={profileSrc} profileSrc={image} title="cristel Fenandez"/>
    </div>
    )
}

export default StoryReel
