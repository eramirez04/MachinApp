import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export const FichaTecnicaEquiposPDF = ({}) => {


    const styles = StyleSheet.create({
        page: {
            padding: 20,
            flexDirection: 'column',
            position: 'relative'
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 20,
        }
    })

    return (
        <>
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
            </Page>
        </Document>
        </>
    )
}