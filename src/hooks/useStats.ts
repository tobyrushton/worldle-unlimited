import { StatsContext, statsContextInterface } from "../components/providers/statsProvider";
import { useContext } from "react";

export default function useStats():statsContextInterface{
    return useContext(StatsContext) as statsContextInterface
}