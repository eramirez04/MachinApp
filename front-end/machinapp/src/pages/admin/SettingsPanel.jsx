import { Layout, Breadcrumb } from "../../index";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export const SettingsPanelPage = () => {
  /*  const manualUrl = "http://10.193.145.90:3000/pdfs/hola2.pdf"; */

  const dataManual = [
    {
      titulo: "Manual de Usuario",
      subTitulo: "Aquí puedes encontrar el manual de usuario.",
      url: "http://10.193.145.90:3000/pdfs/hola2.pdf",
    },
    {
      titulo: "Manual Técnico",
      subTitulo: "Aquí puedes encontrar el manual de Técnico.",
      url: "http://10.193.145.90:3000/pdfs/hola2.pdf",
    },
    {
      titulo: " Manual de Usuario",
      subTitulo: "Aquí puedes encontrar el manual de usuario.",
      url: "http://10.193.145.90:3000/pdfs/hola2.pdf",
    },
  ];

  return (
    <>
      <Layout>
        <Breadcrumb pageName={"Ayuda"} />

        <div
          className="px-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{ minHeight: "100vh" }}
        >
          {dataManual.map((manual, index) => (
            <div className="h-full" key={index}>
              <span className="text-xl font-semibold mb-2">
                {manual.titulo}
              </span>
              <p>{manual.subTitulo}</p>
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer fileUrl={manual.url} />
              </Worker>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};
