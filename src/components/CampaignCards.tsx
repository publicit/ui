import CampaignCard from "./CampaignCard";
import {Grid} from "@mantine/core";
import {Campaign} from "../models/campaign";

export default function CampaignCards({rows}: { rows: Campaign[] }) {
    return (
        <div>
            <h2>Listado de Campañas</h2>
            <Grid
            >
                {rows.map(r =>
                    <Grid.Col span={4} key={r.id}>
                        <CampaignCard c={r} />
                    </Grid.Col>
                )}
            </Grid>
        </div>
    )
}
