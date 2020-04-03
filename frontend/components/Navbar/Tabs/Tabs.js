import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'

import { AppContext } from 'context'
import { GET_COMMUNITIES } from 'apis/Community'

import Tab from './Tab/Tab'
import * as S from './Tabs.styled'

const Tabs = () => {
  const { communitiesLoaded, setCommunitiesLoaded } = useContext(AppContext)

  const { data: { communities = [] } = {} } = useQuery(GET_COMMUNITIES, {
    onCompleted: () => {
      if (!communitiesLoaded) {
        setCommunitiesLoaded(true)
      }
    },
  })

  const {
    query: { community: selectedCommunity },
  } = useRouter()

  return (
    <S.Tabs>
      {communities
        .filter(community => community.url !== 'direct')
        .map((community, index) => {
          const active = community.url === selectedCommunity
          const nextActive =
            index < communities.length - 1
              ? communities[index + 1].url === selectedCommunity
              : false

          return (
            <Tab
              community={community}
              active={active}
              nextActive={nextActive}
              index={index}
              key={community.id}
            />
          )
        })}
    </S.Tabs>
  )
}

export default Tabs
