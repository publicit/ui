// Mantine :
import { Grid } from "@mantine/core";

// Components :
import CampaignCard from "./CampaignCard";

// Models :
import { Campaign } from "../models/campaign";


type params = { rows: Campaign[] }

export default function CampaignCards({ rows }: params) {
    return (
        <>
            <h2>Listado de Campañas</h2>
            <Grid>
                {rows.map(r =>
                    <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }} key={r.id}>
                        <CampaignCard c={r} />
                    </Grid.Col>
                )}
            </Grid>
        </>
    )
}
