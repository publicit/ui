import React, {useEffect, useState} from "react";
import {MarkerProps} from "@react-google-maps/api";
import {useNavigate, useParams} from "react-router-dom";

//  Mantine :
import {Grid} from "@mantine/core";
import {useForm} from "@mantine/form";

// Helpers :
import {AddressFromLocation, CampaignLoad, QuizPost} from "../helpers/api"

// Components :
import {QuizEditForm} from "../components/QuizEditForm";
import {notifyErrResponse} from "../components/Errors";
import {BreadcrumComponent} from "../components/BreadcrumComponent";

// Models :
import {Campaign} from "../models/campaign";
import {BreadcrumbItem} from "../models/breadcrumbItem";
import {Quiz, QuizStatus, quizValidation} from "../models/quiz";
import {GoogleMaps} from "../components/GoogleMaps";
import {Location} from "../models/location";
import {LocationsTable} from "../components/LocationsTable";


export default function QuizNew() {
    const navigate = useNavigate();
    const campaignId = useParams().campaign_id || ""

    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    const [canEdit, setCanEdit] = useState<boolean>(true)
    const [items, setItems] = useState<BreadcrumbItem[]>([])

    // Selected locations are coming in below state
    const [selectedLocation, setSelectedLocation] = useState<MarkerProps['position'][]>([]);
    const [locations, setLocations] = useState<Location[]>([])

    const form = useForm<Quiz>({
        initialValues: quiz,
        validate: quizValidation(),
    })

    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await CampaignLoad(id)
                setItems([
                    {
                        text: `${data.name}`,
                        to: `/campaigns/${data.id}`
                    },
                ])
                quiz.status = QuizStatus[QuizStatus.draft]
                setQuiz(quiz)
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(campaignId)

    }, []);

    async function onSubmit(q: Quiz) {
        try {
            setCanEdit(false)
            const campaign = new Campaign()
            campaign.id = campaignId
            q.campaign = campaign
            const res: Quiz = await QuizPost(q, locations)
            const returnURL: string = `/quizs/${res.id}`
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setCanEdit(true)
        }
    }

    async function addLocation(location: Location) {
        const _locations = locations
        location.address = await AddressFromLocation(location)
        _locations.push(location)
        console.table(JSON.stringify(location.address))
        setLocations(_locations)
    }

    function removeLocation(index: number) {
        const _locations = locations.filter((val: Location, i: number) => i !== index)
        setLocations(_locations)
    }

    return (
        <div className="user-new-quiz-container">
            <BreadcrumComponent items={items}/>
            <h1>Agregar Encuesta</h1>
            <Grid>
                <Grid.Col span={{md: 12, lg: 12,}}>
                    <div className="form-wrapper">
                        <QuizEditForm
                            onSubmit={onSubmit} form={form}
                            legend="Nueva Encuesta" quiz={quiz} canEdit={canEdit}
                        />
                    </div>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={{md: 12, lg: 12}}>
                    <div className="form-wrapper">
                        <GoogleMaps
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            onClick={addLocation}
                        />
                    </div>
                </Grid.Col>
                <Grid.Col>
                    <LocationsTable
                        locations={locations}
                        onDelete={removeLocation}/>
                </Grid.Col>
            </Grid>
        </div>
    )
}
