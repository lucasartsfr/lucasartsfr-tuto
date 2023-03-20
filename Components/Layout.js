import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';

export default function Layout({children, data}) {

    const ListMenu = data && Object.keys(data).map(item =>{ 
        return (
        <div className='LayoutContainer' key={uuidv4()}>
            <div className='LayoutImage'><Image fill src={`https://formation.lucasarts.fr/poster/logos/${item}.jpg`} alt={item}/></div>
            <h3 className='LayoutTitle'>{item}</h3>
        </div>
        )
    })

    return (
        <>
            <div className='HeaderRight'>
                {ListMenu}
            </div>
            {children}
        </>
    )
}
