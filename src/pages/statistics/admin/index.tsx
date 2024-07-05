import { ScrollButton, Select, SimpleBarCharts, SimplePieCharts } from '@/components'
import { Loading } from '@/components/loading'
import { FRONT_BASE_URL } from '@/constants'
import RootLayout from '@/layouts/root-layout'
import {
  GetSSPropsResult,
  User
} from '@/types'
import { Item, getUser } from '@/utils'
import { requireNothing } from '@/utils/permissions'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BarChart, BarList, DonutChart, Legend, LineChart } from '@tremor/react';
import { useForm } from 'react-hook-form'
import { ButtonEnum } from "@/components/types";
import defaultProfilePic from 'public/profile-pic-default.jpg'
import Image from "next/image";

export async function getServerSideProps({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res))
}
interface GlobalStatistics {
  cantidadProductosDonadosCentro: number
  cantidadIntercambiosConfirmadosVoluntario: number
  intercambiosPorCategoria: [{ cantidad: number, categoria: string }]
  centroConMasCantidadDeIntercambios: {
    borrado: boolean
    dias: string[]
    direccion: string
    horario_apertura: string
    horario_cierre: string
    id_centro: number
    nombre_centro: string
    tiene_voluntario: boolean
    ubicacion: string
  }
  donacionesPorCategoria: [{
    categoria: string
    cantidad: number
  }]
  intercambiosCanceladosCount: number
  intercambiosConfirmadosConDonacionCount: number
  intercambiosConfirmadosSinDonacionCount: number
  intercambiosRechazadosCount: number
  intercambiosTotalesCount: number
  intercambiosTotalesPorFecha: [{
    cancelados: number
    confirmados: number
    fechaIntercambio: string
    rechazados: number
  }]
  motivoDeCancelacionMasFrecuente: string
  motivoDeRechazoMasFrecuente: string
  voluntarioConMasIntercambiosConfirmados: {
    apellido: string
    borrado: boolean
    centro: number
    dni: string
    fecha_nacimiento: string
    fecha_registro: string
    foto: string
    id: number
    mail: string
    nombre: string
    rol: number
  }

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

interface StatisticsAdmin {
  estadisticasGlobales: GlobalStatistics
  estadisticasLocalidades: [{
    intercambiosCanceladosLocalidadCount: number
    intercambiosConfirmadosConDonacionLocalidadCount: number
    intercambiosConfirmadosSinDonacionLocalidadCount: number
    intercambiosRechazadosLocalidadCount: number
    intercambiosTotalesLocalidad: number
    localidad: string
    motivoDeCancelacionMasFrecuenteLocalidad: string
    motivoDeRechazoMasFrecuenteLocalidad: string
  }]
  estadisticasVoluntario: StatisticsVolunteer
}

interface FormData {
  fecha_inicio: string;
  fecha_fin: string;
  center: number | string;
}
interface CenterData {
  dias: [{
    idDia: number
    descripcion: string
  }]
  direccion: string
  horario_apertura: string
  horario_cierre: string
  id_centro: number
  nombre_centro: string
  ubicacion: string
}
export default function UsersSistemList({ user }: { user: User }) {
  const router = useRouter()
  const [statistics, setStatistics] = useState<StatisticsAdmin>()
  const [isLoading, setIsLoading] = useState(true)
  const [dayFrom, setDayFrom] = useState<string>("");
  const [dayTo, setDayTo] = useState<string>("");
  const [dayFromAUX, setDayFromAUX] = useState<string>("");
  const [dayToAUX, setDayToAUX] = useState<string>("");
  const [centersRawList, setCentersRawList] = useState<CenterData[]>();
  const [centersRaw, setCentersRaw] = useState<Item[]>([]);
  const [centerSelected, setCenterSelected] = useState(-1);
  const arrayCategoria = ["Utiles escolares", "Alimentos", "Limpieza", "Ropa"];
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
      fechaFin: '2400-01-01',
      center: -1
    }
    const getStatistics = async () => {
      await axios
        .post(`${FRONT_BASE_URL}/statistics/admin`, auxDates)
        .then(async (res: any) => {
          console.log(res.data);
          setValue('center', -1);
          setStatistics(res.data);
        })
        .catch((error: { response: { data: { message: string } } }) => {
          console.log(error);
        });
    };
    getStatistics();
  }, []);
  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false) // Cambia isLoading a false después de 2 segundos
    }, 400)
  }, [])
  useEffect(() => {
    const centrosMuyAux: Item[] = []

    const getCenters = async () => {
      await axios
        .get(`${FRONT_BASE_URL}centers/get`)
        .then((res: any) => {
          setCentersRawList(res.data)
          //console.log(res.data);
          res.data.sort((a: any, b: any) => {
            if (a.borrado && !b.borrado) return 1;
            if (!a.borrado && b.borrado) return -1;
            return 0;
          }).map((e: any) => {
            centrosMuyAux.push({
              value: `${e.id_centro}`,
              label: `${e.ubicacion} - ${e.direccion} - ${e.nombre_centro} ${e.tiene_voluntario ? '- Voluntario activo' : ''} ${e.borrado ? '- (BORRADO)' : ''}`
            })

          })
        })
    }
    getCenters()
    //console.log(centrosMuyAux);

    setCentersRaw(centrosMuyAux)
    console.log(centersRaw);

  }, [])

  const mapDonacionesPorCategoria = () => {
    let arr: any = [
      { name: "Ropa", 'Cantidad de donaciones': 0 },
      { name: "Utiles escolares", 'Cantidad de donaciones': 0 },
      { name: "Alimento", 'Cantidad de donaciones': 0 },
      { name: "Limpieza", 'Cantidad de donaciones': 0 }]
    statistics?.estadisticasGlobales.donacionesPorCategoria.map((e) => {
      // arr.push({
      //   name: firstLetterUpperCase(e.categoria),
      //   'Cantidad de donaciones': e.cantidad
      // })
      let index = arr.findIndex(
        (x:any) => x.name == firstLetterUpperCase(e.categoria)
      );
      arr[index]['Cantidad de donaciones'] = e.cantidad;
    })
    console.log(arr);

    arr.sort((a: any, b: any) => b['Cantidad de donaciones'] - a['Cantidad de donaciones']);
    return arr
  }
  const firstLetterUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const dataFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();

  const trades = [
    {
      name: "Confirmados",
      trades: (statistics?.estadisticasGlobales.intercambiosConfirmadosConDonacionCount ?? 0) + (statistics?.estadisticasGlobales?.intercambiosConfirmadosSinDonacionCount ?? 0),
    },
    {
      name: "Rechazados",
      trades: statistics?.estadisticasGlobales.intercambiosRechazadosCount,
    },
    {
      name: "Cancelados",
      trades: statistics?.estadisticasGlobales.intercambiosCanceladosCount,
    },
  ];
  const valueFormatter = (number: number) => `Total: ${Intl.NumberFormat("us").format(number).toString()}`;

  const intercambiosPorDias = () => {
    let auxARR: any = []
    statistics?.estadisticasGlobales.intercambiosTotalesPorFecha.map((e) => {
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
    const day = date.getDate() + 1;
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
  };

  const mapTopLocationTrades = () => {
    let arr: any = []
    statistics?.estadisticasLocalidades.map((e) => {
      arr.push({
        Localidad: e.localidad,
        Confirmados: e.intercambiosConfirmadosConDonacionLocalidadCount + e.intercambiosConfirmadosSinDonacionLocalidadCount,
        Rechazados: e.intercambiosRechazadosLocalidadCount,
        Cancelados: e.intercambiosCanceladosLocalidadCount,
      })
    })
    arr.sort((a: any, b: any) => (b.Confirmados + b.Rechazados + b.Cancelados) - (a.Confirmados + a.Rechazados + a.Cancelados));
    return arr
  }
  const _handleSubmit = async (formData: FormData) => {
    const formDataAux = {
      fechaInicio: dayFrom == '' ? '1900-01-01' : dayFrom,
      fechaFin: dayTo == '' ? '2400-01-01' : dayTo,
      center: formData.center == "" ? -1 : formData.center
    };
    //console.log(formDataAux);

    const getStatistics = async () => {
      await axios
        .post(`${FRONT_BASE_URL}/statistics/admin`, formDataAux)
        .then(async (res: any) => {
          setStatistics(res.data);
          console.log(res.data);

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
    setValue('center', -1)
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
  const handleCenterChange = (e: any) => {
    setValue('center', parseInt(e.target.value))
    clearErrors('center')
    setCenterSelected(parseInt(e.target.value));
  }
  const getCategoriesStatistics = () => {
    let cate = [
      { name: "Ropa", value: 0 },
      { name: "Utiles escolares", value: 0 },
      { name: "Alimento", value: 0 },
      { name: "Limpieza", value: 0 },
    ];
    if (statistics?.estadisticasGlobales.intercambiosPorCategoria != null) {
      statistics?.estadisticasGlobales.intercambiosPorCategoria.map((e) => {
        let index = cate.findIndex(
          (x) => x.name == firstLetterUpperCase(e.categoria)
        );
        cate[index].value = e.cantidad;
      });
      cate.sort((a, b) => b.value - a.value);
    }
    return cate;
  };

  const getDays = (arr: [{
    descripcion: string,
    idDia: number
  }]) => {
    let diaZ = ''
    arr.map((e) => {
      diaZ = `${diaZ} ${e.descripcion.substring(0, 2)} `
    })
    return diaZ
  };

  // const checkButtonDisabled = () => {
  //   const button = document.querySelector('#request-global-stats-button');
  //   if (button) {
  //     return button.disabled;
  //   }
  //   return null;
  // };

  const getInformationCenter = () => {
    return centersRawList?.filter(x => x.id_centro == centerSelected).map((e) => {
      return (
        <div className="text-black flex flex-col items-center me-[60px]">
          <h1 className="text-2xl font-bold mb-[20px]">
            Informacion de: {e.nombre_centro}
          </h1>
          <div className="w-[300px]">
            <p className="w-auto flex justify-between pb-[5px]">
              <span className="font-semibold text-[18px]">Localidad: </span>{" "}
              {e.ubicacion}
            </p>
            <p className="w-auto flex justify-between py-[5px]">
              <span className="font-semibold text-[18px]">Direccion: </span>{" "}
              {e.direccion}
            </p>
            <p className="w-auto flex justify-between py-[5px]">
              <span className="font-semibold text-[18px]">Dias: </span>{" "}
              {getDays(e.dias)}
            </p>
            <p className="w-auto flex justify-between py-[5px]">
              <span className="font-semibold text-[18px]">Horarios:</span>{" "}
              {e.horario_apertura} - {e.horario_cierre}
            </p>
          </div>
        </div>
      )
    })
  }

  return (
    <RootLayout user={user}>
      <div className="">
        <div className="w-[100vw] flex justify-center">
          <p className="text-xl font-semibold text-blue-900  mt-[20px] m-auto">
            ESTADISTICAS
          </p>
        </div>
        {statistics?.estadisticasGlobales == null ? <div className="flex justify-center"><p className="text-2xl font-bold text-gray-500 mt-[40px] m-auto">
          NO HUBO INTERCAMBIOS EN EL SISTEMA PARA MOSTRAR ESTADISTICA
        </p></div> :
          isLoading ? <>
            <div className="flex justify-center mt-[50px]">
              <div className="">
                <Loading />
              </div>
            </div>
          </> :
            <div className='flex flex-col justify-center items-center'>
              <div className="w-[80vw] flex justify-between bg-blue-900 bg-opacity-10 p-[25px] rounded-[10px] items-center mt-[20px]">
                <form
                  key="request-date-form"
                  noValidate
                  onSubmit={handleSubmit(_handleSubmit)}
                  className="ms-[60px]"
                >
                  <div className='' >
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
                        disabled={(dayFrom == "" || dayTo == "") && (watch('center') == -1)}
                      >
                        Consultar
                      </button>
                      <button
                        key="request-date-form-submit-second-button"
                        type={ButtonEnum.SUBMIT}
                        className=" h-[2.5rem] px-6 w-[150px] outline-transparent outline ms-[20px] bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700 disabled:bg-gray-500 disabled:hover:text-white disabled:hover:outline-none disabled:hover:bg-gray-600"
                        // disabled={(dayFrom != "" || dayTo != "")&&(watch('center')!= -1)}
                        disabled={(dayFromAUX == "" && dayToAUX == "" && watch('center') == -1)}
                        onClick={() => {
                          setDayFrom('')
                          setDayFromAUX('')
                          setDayTo('')
                          setDayToAUX('')
                          setValue('center', -1)
                        }}
                      >
                        Limpiar filtros
                      </button>
                    </div>
                    <div className='flex w-[100%] flex-col mt-[20px]'>
                      <h1 className="text-lg font-semibold text-black place-self-start">
                        Centro
                      </h1>
                      <div className='flex justify-between w-[100%] mt-[5px]'>
                        <div className='text-black w-[79%]'>
                          <Select
                            id='center'
                            // label='Centro'
                            placeholder='Elegir centro'
                            register={register}
                            handleChange={handleCenterChange}
                            options={centersRaw}
                          />
                        </div>
                        <div className=''>
                          {//(statistics.estadisticasVoluntario == null) ?
                            // <button
                            //   id='request-global-stats-button'
                            //   key="request-global-stats-button"
                            //   type={ButtonEnum.BUTTON}
                            //   className="h-[2.5rem] w-[150px] outline-transparent outline disabled:bg-gray-500 disabled:hover:text-white disabled:hover:outline-none disabled:hover:bg-gray-600 bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700"
                            //   disabled={true}
                            // >
                            //   Global
                            // </button> :
                            <button
                              id='request-global-stats-button'
                              key="request-global-stats-button"
                              type={ButtonEnum.BUTTON}
                              className=" h-[2.5rem]  w-[150px] outline-transparent outline disabled:bg-gray-500 disabled:hover:text-white disabled:hover:outline-none disabled:hover:bg-gray-600 bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700"
                              disabled={false}
                              hidden={statistics.estadisticasVoluntario == null}
                              onClick={() => {
                                setDayFrom('')
                                setDayFromAUX('')
                                setDayTo('')
                                setDayToAUX('')
                                setValue('center', -1)
                                _handleSubmit({ center: -1, fecha_fin: '2400-01-01', fecha_inicio: '1900-01-01' })
                              }}
                            >
                              Global
                            </button>}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                {statistics.estadisticasVoluntario != null ?
                  getInformationCenter()
                  : <></>}
              </div>
              {statistics?.estadisticasVoluntario == null ?
                <div>
                  <p className="text-xl font-semibold text-blue-900  mt-[20px] m-auto">
                    ESTADISTICAS GLOBALES  {((dayFromAUX != '') && (dayToAUX != '')) ? `- ${formatDate(dayFromAUX)} ➜ ${formatDate(dayToAUX)}` : ''}
                  </p>
                  <div className='w-[100%] h-[1px] bg-blue-900 '></div>
                  <div className='w-[80vw]'>
                    <div className='w-[100%] flex justify-between my-[40px]'>
                      <div className='w-[650px] bg-blue-900 bg-opacity-10 rounded-[10px] p-[20px] flex flex-col items-center'>
                        <h1 className="font-semibold text-black text-3xl pb-[20px]">
                          Cantidad de donaciones por categoria
                        </h1>
                        <BarChart
                          className="mt-6"
                          data={mapDonacionesPorCategoria()}
                          index="name"
                          categories={['Cantidad de donaciones']}
                          colors={['blue']}
                          valueFormatter={dataFormatter}
                          yAxisWidth={48}
                        />
                      </div>
                      <div className="w-[780px] h-auto bg-blue-900 bg-opacity-10 rounded-[10px] flex flex-col items-center">
                        <h1 className="font-semibold text-black text-3xl pt-[20px]">
                          {dayFromAUX == '' && dayToAUX == '' ? 'Todos los intercambios' : `Intercambios desde ${formatDate(dayFromAUX)} hasta ${formatDate(dayToAUX)}`}
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
                    </div>
                    <div className='w-[100%] flex justify-between my-[40px]'>
                      <div className="flex flex-col items-center bg-blue-900 bg-opacity-10 p-[20px] rounded-[10px] w-[600px]">
                        <h1 className="font-semibold text-black text-3xl pb-[20px]">
                          Intercambios totales
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

                      <div className='w-[700px] bg-blue-900 bg-opacity-10 rounded-[10px] p-[20px] flex flex-col items-center'>
                        <h1 className="font-semibold text-black text-3xl pb-[20px]">
                          Top 3 localidades con mas intercambios
                        </h1>
                        <BarChart
                          className="h-60"
                          data={mapTopLocationTrades()}
                          index="Localidad"
                          categories={['Confirmados', 'Rechazados', 'Cancelados']}
                          colors={["green-500", "blue-900", "rose-700"]}
                          yAxisWidth={30}
                        />

                      </div>
                    </div>
                  </div>
                  <div className="w-[80vw]">
                    <div className='flex justify-between my-[40px]'>
                      <div className="bg-blue-900 bg-opacity-10 rounded-[10px] w-[700px] flex justify-between">
                        <div className="w-[100%] p-[25px] text-black  flex flex-col items-center">
                          <h1 className="font-semibold text-black text-3xl pb-[20px]">
                            Informacion adicional
                          </h1>
                          <div className='w-[90%]'>
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
                                  src={statistics?.estadisticasGlobales.voluntarioConMasIntercambiosConfirmados.foto ? statistics?.estadisticasGlobales.voluntarioConMasIntercambiosConfirmados.foto : defaultProfilePic}
                                />
                                <p className="ms-[5px]">
                                  {statistics?.estadisticasGlobales.voluntarioConMasIntercambiosConfirmados.nombre} {statistics?.estadisticasGlobales.voluntarioConMasIntercambiosConfirmados.apellido} <span className="font-semibold text-gray-700">| {statistics.estadisticasGlobales.cantidadIntercambiosConfirmadosVoluntario} |</span>
                                </p>
                              </div>
                            </p>
                            <p className="text-lg flex justify-between">
                              <span className="font-semibold text-lg">
                                Cantidad de intercambios con donacion:{" "}
                              </span>{" "}
                              {statistics?.estadisticasGlobales.intercambiosConfirmadosConDonacionCount}
                            </p>
                            <p className="text-lg flex justify-between">
                              <span className="font-semibold text-lg">
                                Motivo mas comun de Rechazo:{" "}
                              </span>{" "}
                              {statistics?.estadisticasGlobales.motivoDeRechazoMasFrecuente}
                            </p>
                            <p className="text-lg flex justify-between">
                              <span className="font-semibold text-lg">
                                Motivo mas comun de Cancelacion:{" "}
                              </span>{" "}
                              {statistics?.estadisticasGlobales.motivoDeCancelacionMasFrecuente}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col bg-blue-900 bg-opacity-10 rounded-[10px] w-[600px] p-[25px] items-center">
                        <h1 className="font-semibold text-black text-3xl pb-[20px]">
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
                </div> :
                <div className='w-[80vw]'>
                  {statistics?.estadisticasVoluntario ? (statistics?.estadisticasVoluntario.cantidadIntercambiosConfirmados != 0 || statistics?.estadisticasVoluntario.cantidadIntercambiosCancelados != 0 || statistics?.estadisticasVoluntario.cantidadIntercambiosRechazados != 0) ?
                    <div className=" flex flex-col items-center w-[100%] ">
                      <div className='w-[100%]'>
                        <p className="text-xl font-semibold text-blue-900 mt-[20px] m-auto">
                          ESTADISTICAS EN: {statistics?.estadisticasVoluntario.nombre.toUpperCase()}
                        </p>
                      </div>
                      <div className='w-[100%] h-[1px] bg-blue-900 '></div>
                      <div className="h-[auto] w-[100%] mb-[40px]">
                        <div className="flex mt-[40px] justify-between">
                          <div className="w-[780px] h-auto bg-blue-900 bg-opacity-10 rounded-[10px] flex flex-col items-center">
                            <h1 className="font-semibold text-black text-3xl pt-[20px]">
                              {dayFromAUX == '' && dayToAUX == '' ? 'Todos los intercambios' : `Intercambios desde ${formatDate(dayFromAUX)} hasta ${formatDate(dayToAUX)}`}
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
                              Intercambios en {statistics?.estadisticasVoluntario.nombre}
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
                                    src={statistics?.estadisticasVoluntario.fotoVoluntarioMasAuditador ? statistics?.estadisticasVoluntario.fotoVoluntarioMasAuditador : defaultProfilePic}
                                  />
                                  <p className="ms-[5px]">
                                    {statistics?.estadisticasVoluntario.nombreVoluntarioMasAuditador} {statistics?.estadisticasVoluntario.apellidoVoluntarioMasAuditador} <span className="font-semibold text-gray-700">| {statistics?.estadisticasVoluntario.cantidadVoluntarioMasAuditador} |</span>
                                  </p>
                                </div>
                              </p>
                              <p className="text-lg flex justify-between">
                                <span className="font-semibold text-lg">
                                  Cantidad de intercambios con donacion:{" "}
                                </span>{" "}
                                {statistics?.estadisticasVoluntario.cantidadProductosDonados}
                              </p>
                              <p className="text-lg flex justify-between">
                                <span className="font-semibold text-lg">
                                  Motivo mas comun de Rechazo:{" "}
                                </span>{" "}
                                {statistics?.estadisticasVoluntario.motivoMasComunRechazo}
                              </p>
                              <p className="text-lg flex justify-between">
                                <span className="font-semibold text-lg">
                                  Motivo mas comun de Cancelacion:{" "}
                                </span>{" "}
                                {statistics?.estadisticasVoluntario.motivoMasComunCancelacion}
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
                    </div> : <div className="flex justify-center"><p className="text-2xl font-bold text-gray-500 m-auto mt-[40px]">
                      EL CENTRO NO TUVO INTERCAMBIOS AUN
                    </p></div> : <></>}
                </div>}
            </div>
        }
      </div>
    </RootLayout >
  )
}
