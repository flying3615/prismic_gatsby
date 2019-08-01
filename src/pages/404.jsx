/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import NotFoundStyles from '../styles/Notfound.module.css'
import four0four from '../styles/img/404.svg'
import rocket from '../styles/img/rocket.svg'
import earth from '../styles/img/earth.svg'
import moon from '../styles/img/moon.svg'
import astronaut from '../styles/img/astronaut.svg'

export default function NotFound() {
  return (
    <div className={NotFoundStyles.bgPurple}>
      <div className={NotFoundStyles.centralBody}>
        <img className={NotFoundStyles.image404} src={four0four} width="20%" />
        <AniLink className={NotFoundStyles.btnGoHome} fade to="/">
          FADE BACK HOME
        </AniLink>
      </div>
      <div className={NotFoundStyles.objects}>
        <img className={NotFoundStyles.objectRocket} src={rocket} width="2%" />
        <div className={NotFoundStyles.earthMoon}>
          <img className={NotFoundStyles.objectEarth} src={earth} width="8%" />
          <img className={NotFoundStyles.objectMoon} src={moon} width="5%" />
        </div>
        <div className={NotFoundStyles.boxAstronaut}>
          <img className={NotFoundStyles.objectAstronaut} src={astronaut} width="100%" />
        </div>
      </div>
      <div className={NotFoundStyles.glowingStars}>
        <div className={NotFoundStyles.star} />
        <div className={NotFoundStyles.star} />
        <div className={NotFoundStyles.star} />
        <div className={NotFoundStyles.star} />
        <div className={NotFoundStyles.star} />
        <div className={NotFoundStyles.star} />
        <div className={NotFoundStyles.star} />
        <div className={NotFoundStyles.star} />
        <div className={NotFoundStyles.star} />
        <div className={NotFoundStyles.star} />
      </div>
    </div>
  )
}
