import prisma from "../lib/prisma";

export default function Pages({pages}) {
    return (
        <div style={{display: "flex", flexDirection: 'column'}}>
            {pages.map(page =>( 
            <a style={{display: "flex", flexDirection: 'column', border: "1px solid", margin: 15}} href={'/pages/' + encodeURIComponent(page.title)}>
                <h1>{page.title}</h1>
                <img src={page.thumbnail} width={300} />
                </a>
            ))}
        </div>
    )
} 

export const getServerSideProps = async () => {
    let pages = await prisma.pages.findMany({
        select: {
            title: true,
            thumbnail: true,
            text: true
        }
    })
    return {props: {pages: pages}}
}