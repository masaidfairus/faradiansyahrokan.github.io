import React, { Component } from 'react';
import styled from 'styled-components';
import TextContent from './TextContent';
import ImageContent from './ImageContent';

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    /* border: 1px dashed red; */
`;

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vh: 0,
      slideNumber: 0,
    };
    this.pageSplitTimes = 1.4;
    this.lastScrollTop = 0;
    this.scrollDirectionDown = true;
    this.handleScroll = this.handleScroll.bind(this);
    this.workDetails = [
      {
        number: '',
        projectName: '',
        projectDesc: '',
        projectType: '',
        roles: [''],
      },
      {
        number: '01',
        projectName: 'Dzikirku App',
        projectDesc: 'This is my first Android project, which I made using Kotlin. This is also my school project. There are lots of daily prayer readings, prayers during prayer, and morning and evening dhikr.',
        projectType: 'ANDROID',
        roles: ['Android', 'Kotlin'],
      },
      {
        number: '02',
        projectName: 'AroundU',
        projectDesc: "Around U is an Android-based news application developed using the Kotlin programming language. This application is designed to provide a fast, easy and personalized news reading experience. With Around U, users can access a wide variety of news from trusted sources, directly from their mobile devices.",
        projectType: 'ANDROID',
        roles: ['Android' , 'Kotlin'],
      },
      {
        number: '03',
        projectName: 'WARDROBE',
        projectDesc: 'WARDROBE IS AN OMNI CHANNEL FASHION RETAIL SINCE 2010. WE OFFER CONVENIENCE IN SHOPPING BOTH ONLINE AND IN STORE.',
        projectType: 'WEB APP',
        roles: ['UI Designer', 'Front-end Developer'],
      },
      {
        number: '04',
        projectName: 'Plantique',
        projectDesc: 'an creative studio, not an usual studio that connects enthusiast with art, devs, and lifestyle, intertwining with web design, large-scale installations, ux design, product manager, and art direction.',
        projectType: 'WEB APP',
        roles: ['UI Designer', 'Web Developer', 'Front-end Developer'],
      },
      {
        number: '05',
        projectName: 'Portofolio',
        projectDesc: 'I have a burning passion in the world of coding. From the first time I touched these codes, I was fascinated by the potential and creativity that can be expressed through lines of code. This passion has led me to explore programming languages like PHP , Kotlin , Javascript , SQL , Python and exciting challenges in the world of technology.',
        projectType: 'WEB APP',
        roles: ['PORTOFOLIO', 'Front-end Developer'],
      },
      {
        number: '06',
        projectName: 'SKILLFORGE',
        projectDesc: 'SkillForge is a platform or program that can help individuals improve their skills and advance their careers. SkillForge may offer training courses, workshops, or other educational resources designed to teach practical skills that are in high demand in various industries.',
        projectType: 'WEB APP',
        roles: ['UI Designer', 'Full Stack Developer'],
      },
      {
        number: '',
        projectName: '',
        projectDesc: '',
        projectType: '',
        roles: [''],
      },
    ];
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState(
      {
        vh: Math.round(
          window.document.documentElement.clientHeight * this.pageSplitTimes,
        ),
      },
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const { body, documentElement } = event.srcElement;
    const { vh, slideNumber } = this.state;
    const scrollDistance = Math.max(body.scrollTop, documentElement.scrollTop);
    if (scrollDistance > this.lastScrollTop) {
      this.scrollDirectionDown = true;
    } else {
      this.scrollDirectionDown = false;
    }
    this.lastScrollTop = scrollDistance;
    // console.log(scrollDistance);

    if (Math.floor(scrollDistance / vh) !== slideNumber
      && slideNumber < this.workDetails.length - 1) {
      this.setState({ slideNumber: Math.floor(scrollDistance / vh) });
    } else if (slideNumber === this.workDetails.length - 1
      && (Math.floor(scrollDistance / vh) < slideNumber)) {
      this.setState({ slideNumber: Math.floor(scrollDistance / vh) });
    }
  }

  changeTextContentBasedOnScroll() {
    const { slideNumber } = this.state;
    const refresh = true;
    return (
      <TextContent
        number={this.workDetails[slideNumber].number}
        projectName={this.workDetails[slideNumber].projectName}
        projectDesc={this.workDetails[slideNumber].projectDesc}
        projectType={this.workDetails[slideNumber].projectType}
        roles={this.workDetails[slideNumber].roles}
        refreshToggle={refresh}
      />
    );
  }

  render() {
    return (
      <Container>
        {this.changeTextContentBasedOnScroll()}
        <ImageContent pageSplitTimes={this.pageSplitTimes} />
      </Container>
    );
  }
}

export default Work;
