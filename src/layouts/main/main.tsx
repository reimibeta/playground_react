import React from "react";

interface BreadcrumbInterface {
    link?: string,
    name?: string,
    active?: boolean,
}

export interface MainInterface {
    title?: string,
    breadcrumb?: Array<BreadcrumbInterface>,
    content?: JSX.Element
}

const Main: React.FC<MainInterface> = ({ 
    title,
    breadcrumb,
    content 
}) => {

    return (
        <>
            <main>
                <div className={title || breadcrumb ? "container-fluid px-4" : "container-fluid px-4 mt-4"}>
                    {title ? <h1 className="mt-4">{title}</h1> : <></>}
                    {breadcrumb && breadcrumb.length > 0 ? <ol className="breadcrumb mb-4">
                        {breadcrumb.map((item, index) => {
                            return (
                                <li key={index} className={item.active ? "breadcrumb-item active" : "breadcrumb-item"}>
                                    {item.link ? <a href={item.link}>{item.name}</a> : <>{item.name}</>}
                                </li>
                            );
                        })}
                    </ol> : <></>}
                    {/* <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li className="breadcrumb-item active">Sidenav Light</li>
                    </ol> */}
                    {content}
                </div>
            </main>
        </>
    );
}

export default Main;