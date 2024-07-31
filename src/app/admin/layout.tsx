import {ClerkProvider} from "@clerk/nextjs";
import { Metadata } from "next";
import AdminNavbar from "./AdminNavbar";

export const metadata: Metadata = {
    title: "Admin"
};

export default function Layout({children} : {children : React.ReactNode}){
    return <ClerkProvider>
        <AdminNavbar/>
        {children}
    </ClerkProvider>;
    //this way clerk will be active for all child pages i.e., childpages of admin  
}