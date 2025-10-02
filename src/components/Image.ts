import { html } from "@devwareng/vanilla-ts"

type ImgProps = {
    src: string,
    alt: string,
    className?: string,
    width?: number,
    height?: number,
}

const Img = ({ src, alt, className, width, height }: ImgProps) => {
    return (
        html`
            <img src=${src} alt=${alt} class=${className} width=${width} height=${height}>
        `
    )
}

export { Img }