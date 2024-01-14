import {FileInput} from "@mantine/core";
import {IconUpload} from "@tabler/icons-react";

export default function LocationImport() {
    return (
        <div>
            Haz click <a href="/assets/location-import-template.csv" target="_blank">aqui</a> para descargar el CSV de muestra.
            <br/>
            <FileInput
                placeholder="Archivo CSV"
                label="Subir datos de localizaciones"
                multiple={false}
                onChange={file => console.log(file)}
                leftSection={<IconUpload/>}
                clearable={true}
                accept=".csv"
            />
        </div>
    )
}
