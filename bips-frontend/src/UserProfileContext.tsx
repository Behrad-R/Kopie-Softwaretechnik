import {createContext} from "react";
import {UserProfile} from "./generated";

/**
 * A react context for the userProfile information
 */
export const UserProfileContext = createContext<UserProfile | undefined>(undefined);