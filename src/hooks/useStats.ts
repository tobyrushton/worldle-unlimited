import { StatsContext, statsContextInterface } from "../components/statsProvider";
import { useContext } from "react";

export default function useStats():statsContextInterface{
    return useContext(StatsContext) as statsContextInterface
}