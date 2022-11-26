export interface CardProps {
	id: number,
	name: string,
	description: string,
	img: string,
	path?: string,
	ref?:{
		characters?: Array<RefElement>,
		comics?: Array<RefElement>,
		series?: Array<RefElement>,
	}
}

interface RefElement{
	name: string,
	id: number
}