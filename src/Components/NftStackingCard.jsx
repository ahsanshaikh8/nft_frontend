import React from 'react'
import PropTypes from 'prop-types'

function NftStackingCard(props) {
  return (
    <div className='nft-stacking-card'>
        <div className='name'>
        NFT Name <br /> $ 1000
        </div>
        <div className='quantity'>
        Quantity To Be Staked <br /> $ 1000
        </div>
        <div className='floor'>
        Floor Price <br /> $ 1000
        </div>
        <div className='market'>
        Market Price <br /> $ 1000
        </div>
        <div className='details'>
        Staking Duration <br /> Time 17:45 AM / PM <br /> Duration: 52 Weeks

        </div>
    </div>
  )
}


export default NftStackingCard
