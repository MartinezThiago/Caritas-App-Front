import { MultiSelect, SimpleBarCharts, SimplePieCharts } from "@/components";
import ExtendedPostCard from "@/components/extended-post-card";
import { FRONT_BASE_URL } from "@/constants";
import { BarList, Legend } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import RootLayout from "@/layouts/root-layout";
import { useForm } from "react-hook-form";
import { GetSSPropsResult, PostDataAdapter, User } from "@/types";
import { getUser } from "@/utils";
import { requireNothing } from "@/utils/permissions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonEnum } from "@/components/types";
import CenterDescription from "@/components/center-description";
import Image from "next/image";
import defaultProfilePic from 'public/profile-pic-default.jpg'
import { LineChart } from '@tremor/react';
import { Loading } from "@/components/loading";

interface FormData {
  fecha_inicio: string;
  fecha_fin: string;
}

interface StatisticsVolunteer {
  borrado: boolean;
  cantidadIntercambiosPorCategoria: [
    { cantidadIntercambios: number; categoriaProducto: number }
  ];
  cantidadIntercambiosCancelados: number;
  cantidadIntercambiosConfirmados: number;
  cantidadIntercambiosRechazados: number;
  cantidadProductosDonados: number;
  direccion: string;
  horarioApertura: string;
  horarioCierre: string;
  idCentro: number;
  motivoMasComunCancelacion: string;
  motivoMasComunRechazo: string;
  nombre: string;
  ubicacion: string;
  dias: [{ idDia: number; descripcion: string }];
  fotoVoluntarioMasAuditador: string;
  nombreVoluntarioMasAuditador: string;
  apellidoVoluntarioMasAuditador: string;
  cantidadVoluntarioMasAuditador: number;
  intercambios: [{
    fechaIntercambio: string,
    confirmados: number,
    rechazados: number,
    cancelados: number
  }]
}
export async function getServerSideProps({
  req,
  res,
}: Readonly<{
  req: NextApiRequest;
  res: NextApiResponse;
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res));
}

export default function UsersSistemList({ user }: { user: User }) {
  const router = useRouter();
  const [dayFrom, setDayFrom] = useState<string>("");
  const [dayTo, setDayTo] = useState<string>("");
  const [dayFromAUX, setDayFromAUX] = useState<string>("");
  const [dayToAUX, setDayToAUX] = useState<string>("");
  const [statistics, setStatistics] = useState<StatisticsVolunteer>();
  const arrayCategoria = ["Utiles escolares", "Alimentos", "Limpieza", "Ropa"];
  const [isLoading, setIsLoading] = useState(true)
  const CENTER_VOLUNTEER = user.center ? user.center : '0'
  const intStates = ['Rechazados', 'Confirmados', 'Cancelados']
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    resetField,
  } = useForm<FormData>();

  useEffect(() => {
    let auxDates = {
      fechaInicio: '1900-01-01',
      fechaFin: '2400-01-01'
    }
    const getStatistics = async () => {
      await axios
        .post(`${FRONT_BASE_URL}/statistics/volunteer`, auxDates)
        .then(async (res: any) => {
          console.log(res.data);
          setStatistics(res.data);
        })
        .catch((error: { response: { data: { message: string } } }) => {
          console.log(error);
        });
    };
    getStatistics();
  }, []);

  const getDays = () => {
    let diaZ = ''
    statistics?.dias.map((e) => {
      diaZ = `${diaZ} ${e.descripcion.substring(0, 2)} `
    })
    return diaZ
  };

  const getCategoriesStatistics = () => {
    let cate = [
      { name: "Ropa", value: 0 },
      { name: "Utiles escolares", value: 0 },
      { name: "Alimento", value: 0 },
      { name: "Limpieza", value: 0 },
    ];
    if (statistics?.cantidadIntercambiosPorCategoria != null) {
      statistics?.cantidadIntercambiosPorCategoria.map((e) => {
        let index = cate.findIndex(
          (x) => x.name == arrayCategoria[e.categoriaProducto - 1]
        );
        cate[index].value = e.cantidadIntercambios;
      });
      cate.sort((a, b) => b.value - a.value);
    }

    return cate;
  };
  //getCategoriesStatistics();
  const trades = [
    {
      name: "Confirmados",
      trades: statistics?.cantidadIntercambiosConfirmados,
    },
    {
      name: "Rechazados",
      trades: statistics?.cantidadIntercambiosRechazados,
    },
    {
      name: "Cancelados",
      trades: statistics?.cantidadIntercambiosCancelados,
    },
  ];
  const _handleSubmit = async (formData: FormData) => {
    const formDataAux = {
      fechaInicio: dayFrom,
      fechaFin: dayTo,
    };
    const getStatistics = async () => {
      await axios
        .post(`${FRONT_BASE_URL}/statistics/volunteer`, formDataAux)
        .then(async (res: any) => {
          setStatistics(res.data);
        })
        .catch((error: { response: { data: { message: string } } }) => {
          console.log(error);
        });
    };
    getStatistics();
    setDayFromAUX(dayFrom)
    setDayToAUX(dayTo)
    setDayFrom('')
    setDayTo('')
  };
  const Field = ({
    text,
    options,
    handleClick,
    datePickerValue,
    dis,
  }: {
    text: string;
    options?: Array<{ value: string; label: string }>;
    handleClick: (value: string) => void;
    datePickerValue?: string;
    dis: boolean;
    datepickerText?: string;
  }): React.ReactNode => {
    return (
      <div className=" flex flex-col">
        <h1 className="text-center text-lg font-semibold text-black place-self-start">
          {text}
        </h1>
        <div className="w-[200px] mt-[5px]">
          <>
            <input
              type="date"
              className="w-full h-[2.5rem] py-2 px-3 appearance-none border shadow text-zinc-700 focus:outline-none focus:shadow-lg border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 hover:cursor-pointer"
              onChange={(e: any) => handleClick(e.target.value)}
              // min={new Date().toISOString().split('T')[0]}
              value={datePickerValue}
              disabled={dis}
            />
          </>
        </div>
      </div>
    );
  };
  const handleDayFromClick = (value: string) => {
    setDayFrom(value);
    console.log(value);
  };
  const handleDayToClick = (value: string) => {
    if (value < dayFrom) {
      alert(`La fecha 'Hasta' no puede ser menor a la fecha 'Desde'`);
      setDayTo("");
    } else {
      setDayTo(value);
    }
  };

  const intercambiosPorDias = () => {
    let auxARR: any = []
    statistics?.intercambios.map((e) => {
      auxARR.push({
        date: formatDate(e.fechaIntercambio),
        Confirmados: e.confirmados,
        Rechazados: e.rechazados,
        Cancelados: e.cancelados
      })
    })
    return auxARR
  }
  const monthNames = [
    "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate()+1;
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
  };
  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false) // Cambia isLoading a false después de 2 segundos
    }, 400)
  }, [])
  const valueFormatter = (number: number) => `Total: ${Intl.NumberFormat("us").format(number).toString()}`;
  //console.log(user);

  return (
    <RootLayout user={user}>
      <div className="">
        <div className="w-[100vw] flex justify-center">
          {Number(CENTER_VOLUNTEER) < 0 ? <div className="flex justify-center mt-[40px]"><p className="text-2xl font-bold text-gray-500  m-auto">
            NO TIENES UN CENTRO ASIGNADO
          </p></div> : (statistics?.cantidadIntercambiosConfirmados != 0 || statistics?.cantidadIntercambiosCancelados != 0 || statistics?.cantidadIntercambiosRechazados != 0)?<p className="text-xl font-semibold text-blue-900  mt-[20px] m-auto">
            ESTADISTICAS EN: {statistics?.nombre.toUpperCase()}
          </p>:<></>}

        </div>
        {Number(CENTER_VOLUNTEER) < 0 ? <></> :
          isLoading ? <div className="flex justify-center mt-[50px]">
            <div className="">
              <Loading />
            </div>
          </div> :
            (statistics?.cantidadIntercambiosConfirmados != 0 || statistics?.cantidadIntercambiosCancelados != 0 || statistics?.cantidadIntercambiosRechazados != 0) ? <>
              <div className="flex justify-center mt-[40px]">
                <div className="w-[75vw] flex justify-between bg-blue-900 bg-opacity-10 p-[25px] rounded-[10px] items-center">
                  <form
                    key="request-date-form"
                    noValidate
                    onSubmit={handleSubmit(_handleSubmit)}
                    className="  "
                  >
                    <div className="flex items-end">
                      <div className="me-[40px]">
                        <Field
                          text="Desde"
                          handleClick={handleDayFromClick}
                          datePickerValue={dayFrom}
                          dis={false}
                        />
                      </div>
                      <div className="me-[40px]">
                        <Field
                          text="Hasta"
                          handleClick={handleDayToClick}
                          datePickerValue={dayTo}
                          dis={dayFrom == ""}
                        />
                      </div>
                      <button
                        key="request-date-form-submit-button"
                        type={ButtonEnum.SUBMIT}
                        className=" h-[2.5rem] px-6 w-[150px] outline-transparent outline disabled:bg-gray-500 disabled:hover:text-white disabled:hover:outline-none disabled:hover:bg-gray-600 bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700"
                        disabled={dayFrom == "" || dayTo == ""}
                      >
                        Consultar
                      </button>
                      <button
                        key="request-date-form-submit-second-button"
                        type={ButtonEnum.SUBMIT}
                        className=" h-[2.5rem] px-6 w-[150px] outline-transparent outline ms-[20px] bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700"
                        disabled={dayFrom != "" || dayTo != ""}
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  </form>
                  <div className="text-black flex flex-col items-center">
                    <p className="text-lg font-bold text-[20px]">
                      Informacion de: {statistics?.nombre}
                    </p>
                    <div className="w-[300px]">
                      <p className="w-auto flex justify-between">
                        <span className="font-semibold text-[18px]">Localidad: </span>{" "}
                        {statistics?.ubicacion}
                      </p>
                      <p className="w-auto flex justify-between">
                        <span className="font-semibold text-[18px]">Direccion: </span>{" "}
                        {statistics?.direccion}
                      </p>
                      <p className="w-auto flex justify-between">
                        <span className="font-semibold text-[18px]">Dias: </span>{" "}
                        {getDays()}
                      </p>
                      <p className="w-auto flex justify-between">
                        <span className="font-semibold text-[18px]">Horarios:</span>{" "}
                        {statistics?.horarioApertura} - {statistics?.horarioCierre}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex justify-center ">
                <div className="h-[100vh] w-[75vw]">
                  <div className="flex mt-[40px] justify-between">
                    <div className="w-[780px] h-auto bg-blue-900 bg-opacity-10 rounded-[10px] flex flex-col items-center">
                      <h1 className="font-semibold text-black text-3xl pt-[20px]">
                        {dayFromAUX==''&&dayToAUX==''?'Todos los intercambios': `Intercambios desde ${formatDate(dayFromAUX)} hasta ${formatDate(dayToAUX)}`}
                      </h1>
                      <LineChart
                        className="w-[600px] py-[20px]"
                        data={intercambiosPorDias()}
                        index="date"
                        yAxisWidth={65}
                        categories={['Confirmados', 'Rechazados', 'Cancelados']}
                        colors={["green-500", "blue-900", "rose-700"]}
                        valueFormatter={valueFormatter}
                      />
                    </div>
                    <div className="flex flex-col items-center bg-blue-900 bg-opacity-10 rounded-[10px] p-[25px]">
                      <h1 className="font-semibold text-black text-3xl">
                        Intercambios en {statistics?.nombre}
                      </h1>
                      <div className="flex justify-center items-center mt-[20px]">
                        <div>
                          <DonutChart
                            data={trades}
                            category="trades"
                            index="name"
                            colors={["green-500", "blue-900", "rose-700"]}
                            showLabel={true}
                            showAnimation={true}
                            valueFormatter={valueFormatter}
                            className="w-[300px] h-[180px] font-semibold "
                          />
                        </div>
                        <div>
                          <Legend
                            categories={["Confirmados", "Rechazados", "Cancelados"]}
                            colors={["green-500", "blue-900", "rose-700"]}
                            className="w-[200px] text-black font-semibold h-[120px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-[700px] bg-blue-900 bg-opacity-10 rounded-[10px] mt-[40px] ">
                      <div className="w-[100%] h-[100%] p-[25px] text-black ">
                        <p className="text-lg flex justify-between">
                          <span className="font-semibold text-lg">
                            Voluntario que mas audito intercambios:
                          </span>
                          <div className="flex items-center ms-[20px]">
                            <Image
                              alt={`ownerPostProfilePic`}
                              className={"w-[38px] rounded-full"}
                              width={0}
                              height={0}
                              src={statistics?.fotoVoluntarioMasAuditador ? statistics?.fotoVoluntarioMasAuditador : defaultProfilePic}
                            />
                            <p className="ms-[5px]">
                              {statistics?.nombreVoluntarioMasAuditador} {statistics?.apellidoVoluntarioMasAuditador} <span className="font-semibold text-gray-700">| {statistics?.cantidadVoluntarioMasAuditador} |</span>
                            </p>
                          </div>
                        </p>
                        <p className="text-lg flex justify-between">
                          <span className="font-semibold text-lg">
                            Cantidad de intercambios con donacion:{" "}
                          </span>{" "}
                          {statistics?.cantidadProductosDonados}
                        </p>
                        <p className="text-lg flex justify-between">
                          <span className="font-semibold text-lg">
                            Motivo mas comun de Rechazo:{" "}
                          </span>{" "}
                          {statistics?.motivoMasComunRechazo}
                        </p>
                        <p className="text-lg flex justify-between">
                          <span className="font-semibold text-lg">
                            Motivo mas comun de Cancelacion:{" "}
                          </span>{" "}
                          {statistics?.motivoMasComunCancelacion}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col bg-blue-900 bg-opacity-10 rounded-[10px] w-[650px] p-[25px] mt-[40px]">
                      <h1 className="font-semibold text-black text-2xl">
                        Cantidad de intercambios por categoria
                      </h1>
                      <div className="mt-[20px]">
                        <BarList
                          data={getCategoriesStatistics()}
                          className="w-[500px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </> : <div className="flex justify-center"><p className="text-2xl font-bold text-gray-500 mt-[40px] m-auto">
              TU CENTRO NO TUVO INTERCAMBIOS AUN
            </p></div>}
      </div>
    </RootLayout>
  );
}
