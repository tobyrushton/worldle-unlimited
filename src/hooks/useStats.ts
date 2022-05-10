import { useContext } from 'react'
import {
    StatsContext,
    statsContextInterface,
} from '../components/providers/statsProvider'

export default function useStats(): statsContextInterface {
    return useContext(StatsContext) as statsContextInterface
}
