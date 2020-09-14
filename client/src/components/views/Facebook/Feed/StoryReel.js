import React from 'react';
import Story from './Story';
import './storyReel.css';
const image = require("../../../../assets/images/Penguins.jpg");
const profileSrc = require("../../../../assets/images/project-1.jpg");

function StoryReel() {
    return (
        <div className="storyReel">
            {/* Story */}
            <Story image={image} profileSrc={profileSrc} title="Nelson Fenandez" />
            <Story image={profileSrc} profileSrc={image} title="Demo 1" />
            <Story image={profileSrc} profileSrc={image} title="Demo 2" />
            <Story image={image} profileSrc={profileSrc} title="Demo 3" />
            <Story image={profileSrc} profileSrc={image} title="Demo 4" />
            <Story image={profileSrc} profileSrc={image} title="Demo 5" />
            <Story image={profileSrc} profileSrc={image} title="Demo 6" />
            <Story image={profileSrc} profileSrc={image} title="Demo 7" />
            <Story image={image} profileSrc={profileSrc} title="Demo 8" />
            <Story image={profileSrc} profileSrc={image} title="Demo 9" />
        </div>
    )
}

export default StoryReel
