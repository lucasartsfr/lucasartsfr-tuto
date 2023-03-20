import Layout from "./Layout";
// import { useState } from "react";

export default function ContainerLayout({children}){

    return(
        <>
            <Layout />
            {children}
        </>
    )
}