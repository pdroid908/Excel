import { useMemo, useState } from "react";
import { Minus, Plus, Printer, RotateCcw, Trash2 } from "lucide-react";
import Welcome from "./welcome/Welcome";

type Orientation = "portrait" | "landscape";

type TableData = string[][];

const INITIAL_DATA: TableData = [
  ["No", "Nama", "Jabatan", "Keterangan"],
  ["1", "Nama Anggota", "Ketua", "Aktif"],
  ["2", "Nama Anggota", "Sekretaris", "Aktif"],
  ["3", "Nama Anggota", "Bendahara", "Aktif"],
];

function App() {
  const [title, setTitle] = useState("Daftar Susunan Keanggotaan");
  const [orientation, setOrientation] = useState<Orientation>("portrait");

  const [table, setTable] = useState<TableData>(INITIAL_DATA);

  const columnCount = table[0]?.length ?? 0;
  const rowCount = table.length - 1;

  const pageStyle = useMemo(
    () => ({
      width: orientation === "portrait" ? "210mm" : "297mm",
      minHeight: orientation === "portrait" ? "297mm" : "210mm",
    }),
    [orientation],
  );

  const updateCell = (rowIndex: number, columnIndex: number, value: string) => {
    setTable((current) => {
      const updated = current.map((row) => [...row]);
      updated[rowIndex][columnIndex] = value;
      return updated;
    });
  };

  const addRow = () => {
    setTable((current) => [
      ...current,
      Array.from({ length: columnCount }, () => ""),
    ]);
  };

  const removeRow = () => {
    if (table.length <= 2) return;

    setTable((current) => current.slice(0, -1));
  };

  const addColumn = () => {
    setTable((current) =>
      current.map((row, index) => [
        ...row,
        index === 0 ? `Kolom ${row.length}` : "",
      ]),
    );
  };

  const removeColumn = () => {
    if (columnCount <= 1) return;

    setTable((current) => current.map((row) => row.slice(0, -1)));
  };

  const resetTable = () => {
    setTable(INITIAL_DATA.map((row) => [...row]));
    setTitle("Daftar Susunan Keanggotaan");
    setOrientation("portrait");
  };

  const printDocument = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @page {
          size: A4 ${orientation};
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f1f5f9;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
        }

        button,
        input {
          font: inherit;
        }

        .print-page {
          width: ${orientation === "portrait" ? "210mm" : "297mm"};
          min-height: ${orientation === "portrait" ? "297mm" : "210mm"};
          margin: 24px auto;
          background: white;
          padding: 18mm;
          box-shadow: 0 10px 35px rgba(15, 23, 42, 0.12);
        }

        .document-title {
          width: 100%;
          border: 0;
          outline: 0;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          color: #172033;
          background: transparent;
          margin-bottom: 20px;
        }

        .document-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .document-table th,
        .document-table td {
          border: 1px solid #64748b;
          padding: 8px 9px;
          vertical-align: middle;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        .document-table th {
          background: #f1f5f9;
          font-weight: 700;
        }

        .document-table input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #172033;
          text-align: inherit;
        }

        .document-table th input {
          font-weight: 700;
        }

        @media print {
          body {
            background: white;
          }

          .no-print {
            display: none !important;
          }

          .print-page {
            margin: 0;
            box-shadow: none;
            width: ${orientation === "portrait" ? "210mm" : "297mm"};
            min-height: ${orientation === "portrait" ? "297mm" : "210mm"};
            padding: 18mm;
          }

          .document-title {
            font-size: 18pt;
          }

          .document-table {
            font-size: 10pt;
          }

          .document-table th,
          .document-table td {
            padding: 6px 7px;
          }

          input {
            -webkit-appearance: none;
            appearance: none;
          }
        }
      `}</style>

      <div className="no-print min-h-screen bg-slate-100">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
            <div>
              <h1 className="text-lg font-bold text-slate-800">
                A4 Table Editor
              </h1>
              <p className="text-sm text-slate-500">
                Buat tabel dan langsung lihat hasil cetaknya
              </p>
            </div>

            <button
              type="button"
              onClick={printDocument}
              className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <Printer size={17} />
              Cetak
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-6">
          <Welcome/>
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={addRow}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Plus size={16} />
                  Baris
                </button>

                <button
                  type="button"
                  onClick={removeRow}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Minus size={16} />
                  Hapus Baris
                </button>

                <button
                  type="button"
                  onClick={addColumn}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Plus size={16} />
                  Kolom
                </button>

                <button
                  type="button"
                  onClick={removeColumn}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Minus size={16} />
                  Hapus Kolom
                </button>

                <button
                  type="button"
                  onClick={resetTable}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setOrientation("portrait")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    orientation === "portrait"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Portrait
                </button>

                <button
                  type="button"
                  onClick={() => setOrientation("landscape")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    orientation === "landscape"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Landscape
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800">Preview A4</h2>
              <p className="text-xs text-slate-500">
                Klik teks atau cell untuk mengubah isinya
              </p>
            </div>

            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
              A4 {orientation === "portrait" ? "Portrait" : "Landscape"}
            </span>
          </div>

          <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-200 p-4">
            <div className="print-page" style={pageStyle}>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="document-title"
                aria-label="Judul dokumen"
              />

              <table className="document-table">
                <thead>
                  <tr>
                    {table[0].map((cell, columnIndex) => (
                      <th key={columnIndex}>
                        <input
                          value={cell}
                          onChange={(event) =>
                            updateCell(0, columnIndex, event.target.value)
                          }
                        />
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {table.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, columnIndex) => (
                        <td key={columnIndex}>
                          <input
                            value={cell}
                            onChange={(event) =>
                              updateCell(
                                rowIndex + 1,
                                columnIndex,
                                event.target.value,
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>
              {rowCount} baris · {columnCount} kolom
            </span>

            <button
              type="button"
              onClick={printDocument}
              className="flex items-center gap-2 font-semibold text-slate-700 hover:text-slate-900"
            >
              <Trash2 size={14} className="hidden" />
              <Printer size={14} />
              Cetak dokumen
            </button>
          </div>
        </main>
      </div>

      <div className="hidden print:block">
        <div className="print-page">
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "18pt",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            {title}
          </div>

          <table className="document-table">
            <thead>
              <tr>
                {table[0].map((cell, columnIndex) => (
                  <th key={columnIndex}>{cell}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {table.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, columnIndex) => (
                    <td key={columnIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
