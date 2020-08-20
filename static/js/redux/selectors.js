import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect'
import store from './store'

export const getCurrentUser = store => store.currentUser

export const selectedCharacterIDSelector = store => store.currentUser.selectedCharacterID
export const character_listSelector =  store => store.currentUser.character_list

export const getSelectedCharacter = createSelector(
    [selectedCharacterIDSelector, character_listSelector], 
    (selectedCharacterID, character_list) => character_list.find(x => x.id === selectedCharacterID)
)

export const getSelectedCharacterPoint = createSelector(
    getSelectedCharacter,
    (selectedCharacter) => selectedCharacter && selectedCharacter.user_point
)

export const getSelectedFavorLevel = createSelector(
    [getSelectedCharacter, getSelectedCharacterPoint],
    (selectedCharacter, user_point) => {
        let favorLevel = 0
        if (selectedCharacter) {
            let {level_rewards} = selectedCharacter
            for (let levelReward of level_rewards) {
                if (user_point >= levelReward.require_point && favorLevel < levelReward.level) {
                    favorLevel = levelReward.level
                }
            }
        }
        return favorLevel
    }
)

export const getMaxLevelPoint = createSelector(
    [getSelectedCharacter],
    (selectedCharacter) => {
        let res = 0
        if (selectedCharacter) {
            let {level_rewards} = selectedCharacter
            for (let levelReward of level_rewards) {
                res = levelReward.require_point
            }
        }
        return res
    }
)

export const getNextLevelPoint = createSelector(
    [getSelectedCharacter, getSelectedCharacterPoint],
    (selectedCharacter, user_point) => {
        let nextPoint = 0
        if (selectedCharacter) {
            let {level_rewards} = selectedCharacter
            for (let levelReward of level_rewards) {
                nextPoint = levelReward.require_point
                if (levelReward.require_point > user_point) {
                    break
                }
            }
        }
        return nextPoint
    }
)