import { useContext } from 'react'
import {
    GameContext,
    gameContextInterface,
} from '../components/providers/gameProvider'

export function useGame(): gameContextInterface {
    return useContext(GameContext) as gameContextInterface
}
