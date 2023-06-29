import prisma from "../../lib/prisma";

export default function Pages({page}) {
    return (
        <div>
            <h1>{page.title}</h1>
            <div dangerouslySetInnerHTML={{__html: page.text}} />
        </div>
    )
} 

export const getServerSideProps = async ({params}) => {
    let page = await prisma.pages.findFirst({
        select: {
            title: true,
            thumbnail: true,
            text: true
        },
        where: {
            title: decodeURIComponent(params.slug)
        }
    })
    return {props: {page: page}}
}