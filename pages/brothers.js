import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import SkyLight from 'react-skylight'
import { config } from 'config'

import { prefixLink } from '../utils/urls.js'

import {
  Row,
  Splash,
  Split,
  ImgGallery,
} from './_sharedComponents'

const brothersInfo = require('./_brothers-data.js')

import CoverImg from '../static/brothers-cover.jpg';
import BrothersImg1 from '../static/brothers-1.jpg';
import BrothersImg2 from '../static/brothers-2.jpg';
import BrothersImg3 from '../static/brothers-3.jpg';
import BrothersImg4 from '../static/brothers-4.jpg';
import BrothersImg5 from '../static/brothers-5.jpg';
import BrothersImg6 from '../static/brothers-6.jpg';
import BrothersImg7 from '../static/brothers-7.jpg';
import BrothersImg8 from '../static/brothers-8.jpg';
import BrothersImg9 from '../static/brothers-9.jpg';
import BrothersImg10 from '../static/brothers-10.jpg';
import BrothersImg11 from '../static/brothers-11.jpg';
import BrothersImg12 from '../static/brothers-12.jpg';

const brothersPhotos = [BrothersImg1, BrothersImg2, BrothersImg3, BrothersImg4, BrothersImg5, BrothersImg6, BrothersImg7, BrothersImg8, BrothersImg9, BrothersImg10, BrothersImg11, BrothersImg12 ].map(url => ({src: prefixLink(url)}));

export default function (props) {
  let _brother;
  let openBrotherFn = () => {};

  const onSelect = (brotherDoc) => _brother.setState(brotherDoc) + openBrotherFn();

  return (
      <DocumentTitle title={"Brothers | " + config.siteTitle}>
        <div>
          <Splash id="brothers" imageUrl={CoverImg}/>
          <div className="contents typography">
            <h1>Brothers</h1>
            <p>ZBT, originally a jewish fraternity, is open to All Men of Good Character. Our house attracts smart and energetic young men interested in sciences and engineering with wide range of athletic and academic interests. Many brothers are very active on campus, leading various student organisations and clubs, dancing in troups, trading, playing poker and teaching web development to the wider MIT community. Many brothers are also involved in student clubs working with kids in Boston area such as <a href="http://campkesem.org/mit">Camp Kesem</a> and <a href="http://mitdynamit.weebly.com/">DynaMIT</a>.</p>
            <ImgGallery images={brothersPhotos} useLightbox />
          </div>
          <hr/>
          <ClassGallery classid="BetaTheta" onSelect={onSelect}/>
          <ClassGallery classid="BetaIota" onSelect={onSelect}/>
          <ClassGallery classid="BetaKappa" onSelect={onSelect}/>
          <ClassGallery classid="BetaLambda" onSelect={onSelect}/>
          <BrotherPane ref={(ref) => _brother = ref} cb={(f) => openBrotherFn = f}/>
        </div>
      </DocumentTitle>
  );
}

class BrotherPane extends React.Component {
  constructor() {
    super();
    this.state = { name: '', classname: '', bio: '' };
  }

  render() {
    this.props.cb(() => this.refs.brotherPopup.show());
    return (
        <SkyLight hideOnOverlayClicked ref="brotherPopup" title={this.state.title}>
          <div className="contents typography">
            <h2>{this.state.name}</h2>
            <h3>{this.state.classname}</h3>
            <p className="brother-bio">{this.state.bio}</p>
          </div>
        </SkyLight>
    );
  }
}

class ClassGallery extends React.Component {
  constructor() {
    super();
    this.state = {open: false};
  }
  render() {
    const { classid } = this.props;
    const { open } = this.state;

    const brothers = brothersInfo.filter(b => b.classid === classid);
    const brothersCards = brothers.map((brotherDoc) => {
      const {imgurl, name, bio} = brotherDoc;
      return (
        <div key={name} className="brother-card">
        <a onClick={(e) => {e.preventDefault(); this.props.onSelect(brotherDoc)}}>
            <img src={imgurl}/>
            <span className="name">{name}</span>
          </a>
        </div>
      );
    });
    const flip = (e) => {
      e.preventDefault();
      this.setState({ open: !open });
    };

    return (
        <div className="class-gallery">
          <a href="#" onClick={flip}><h2>{brothers[0].classname}</h2></a>
          <div className="cards">
          {open ? brothersCards : []}
          </div>
        </div>
    );
  }
}
