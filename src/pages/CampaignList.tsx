import CampaignCards from "../components/CampaignCards";
import {Campaign} from "../models/campaign";


const mockedData: Campaign[] = [
    {
        image: "https://www.cesnext.com/wp-content/uploads/2019/02/obama-356133_1920.jpg",
        id: "1",
        name: "I have a dream",
        description: "Famoso discurso de Barak Obama",
        user: {
            email: "mauricio.lopez@gmail.com",
            image: "https://lh3.googleusercontent.com/a/ACg8ocJgnTdEOykjg1gonkhF_vdyWYYp7mJpMSr6JK3Kx1N6nts6=s96-c",
            name: "Mauricio Lopez",
        },
        start_date: new Date(),
        end_date: new Date(),
        status:"Completado",
    },
    {
        image: "https://c8.alamy.com/compes/g6ean0/el-ex-presidente-de-los-estados-unidos-de-america-bill-clinton-durante-su-discurso-en-el-guildhall-de-la-ciudad-de-londres-despues-de-la-cena-de-la-conferencia-de-gobernabilidad-progresiva-esta-noche-g6ean0.jpg",
        id: "2",
        name: "Monica is cool",
        description: "NYC",
        user: {
            email: "mauricio.lopez@gmail.com",
            image: "https://lh3.googleusercontent.com/a/ACg8ocJgnTdEOykjg1gonkhF_vdyWYYp7mJpMSr6JK3Kx1N6nts6=s96-c",
            name: "Mauricio Lopez",
        },
        start_date: new Date(),
        end_date: new Date(),
        status:"En Progreso",
    },
    {
        image: "https://www.eluniversal.com.mx/resizer/OxjSv3Y8mz1LF9R0j6CWxbuGyv8=/1100x666/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/YYK6VPWV35F6NILZGZ5RIX3PQM.jpg",
        id: "3",
        name: "Mi equipo",
        description: "Barak Obama strikes back!",
        user: {
            email: "mauricio.lopez@gmail.com",
            image: "https://lh3.googleusercontent.com/a/ACg8ocJgnTdEOykjg1gonkhF_vdyWYYp7mJpMSr6JK3Kx1N6nts6=s96-c",
            name: "Juanita Bananas",
        },
        start_date: new Date(),
        end_date: new Date(),
        status:"En Progreso",
    },
    {
        image: "https://letraslibres.com/wp-content/uploads/2023/07/xochitl-galvez-ok.jpg",
        id: "4",
        name: "Oposicion en Mexico",
        description: "Discurso en el Congreso",
        user: {
            email: "mauricio.lopez@gmail.com",
            image: "https://lh3.googleusercontent.com/a/ACg8ocJgnTdEOykjg1gonkhF_vdyWYYp7mJpMSr6JK3Kx1N6nts6=s96-c",
            name: "Chucho Salinas",
        },
        start_date: new Date(),
        end_date: new Date(),
        status:"Cancelado",
    },
]

export default function CampaignList() {
    return (
        <div>
            <CampaignCards rows={mockedData}/>
        </div>
    )
}
