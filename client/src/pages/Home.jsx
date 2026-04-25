import React from 'react'
import Slider from '../components/Slider'
import ChooseDevice from '../components/ChooseDevice'
import ShopByDrop from '../components/NewProCollection'
import BestSeller from '../components/BestSeller'
import ZeroOneSeries from '../components/ZeroOneSeries'
import BlcEssential from '../components/BlcEssential'
import Faq from '../components/Faq'

const Home = () => {
  return (
    <div>
      <Slider/>
      <ChooseDevice/>
      <ShopByDrop/>
      <BestSeller/>
      <ZeroOneSeries/>
      <BlcEssential/>
      <Faq/>
    </div>
  )
}

export default Home