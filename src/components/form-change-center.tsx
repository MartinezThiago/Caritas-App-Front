import { FRONT_BASE_URL } from "@/constants";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import "react-image-gallery/styles/css/image-gallery.css";
import { ButtonEnum } from "./types";
import { Item } from "@/utils/examples/locations";
import Select from "./inputs/select";
import MultiSelect from "./inputs/multi-select";
import { Button } from "./ui/button";

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

/**
 * The form data for the post creation.
 */
interface FormData {
  locationCenter: string
  centerChecked: number
  days: number[] | undefined
  from: number | undefined
  to: number | undefined
}



export default function FormChangeCenter(props: any) {
  console.log(props);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    watch,
    clearErrors
  } = useForm<FormData>();
  const router = useRouter();
  const [centersRaw, setCentersRaw] = useState<Item[]>([]);
  const [locationSelected, setLocationSelected] = useState('');
  const [locationCentersList, setLocationCentersList] = useState<Item[]>([]);
  const [centersRawList, setCentersRawList] = useState<CenterData[]>();
  const [actualCenterSelected, setActualCenterSelected] = useState<CenterData>();

  useEffect(() => {
    const centrosMuyAux: Item[] = []
    const locationsMuyAux: Item[] = []
    const getCenters = async () => {
      await axios
        .get(`${FRONT_BASE_URL}centers/get`)
        .then((res: any) => {
          setCentersRawList(res.data)
          res.data.map((e: any) => {
            centrosMuyAux.push({
              value: `${e.id_centro}`,
              label: `${e.ubicacion} - ${e.direccion} - ${e.nombre_centro}`
            })
            locationsMuyAux.push({
              value: `${e.ubicacion}`,
              label: `${e.ubicacion}`
            })
          })
        })
      const eliminarDuplicados = async (arr: Item[]) => {
        return arr.filter((item, index) => {
          return arr.findIndex((i) => i.value === item.value) === index;
        });
      };
      setLocationCentersList(await eliminarDuplicados(locationsMuyAux))
    }
    getCenters()
    setCentersRaw(centrosMuyAux)
  }, [])


  const handleCenterChange = (e: any) => {
    setValue('centerChecked', parseInt(e.target.value))
    clearErrors('centerChecked')
    setActualCenterSelected(centersRawList?.find(x => x.id_centro == parseInt(e.target.value)))
    console.log(actualCenterSelected);
    setValue('days', [])
    setValue('from', 0)
    setValue('to', 0)
  }

  //MIGRAR auxMakeHoursList
  const auxMakeHoursList = (raw: any) => {
    return Array.from(
      {
        length:
          Number(raw.horario_cierre.split(':')[0]) -
          Number(raw.horario_apertura.split(':')[0])
      },
      (_, i) => i
    ).map(hour => ({
      value: (
        hour + Number(raw.horario_apertura.split(':')[0])
      ).toString(),
      label: `${hour + Number(raw.horario_apertura.split(':')[0])
        }:00`
    }))
  }

  const setLocationValue = (id: any, value: any) => {
    console.log(id);
    setLocationSelected(value)
    setValue(id, value)
    clearErrors(id)
    setValue('days', [])
    setValue('from', undefined)
    setValue('to', undefined)
    setValue('centerChecked', 0)

  }

  const _handleSubmit = async (formData: FormData) => {
    //console.log(formData);
    const auxForm = {
      id_centro_nuevo: formData.centerChecked,
      id_centro_viejo: props.idOldCenter,
      id_publicacion: props.idPost,
      desde: formData.from,
      hasta: formData.to,
      dias: formData.days
    }
    //console.log(auxForm);
    await axios
      .post(`${FRONT_BASE_URL}/change-center-post`, auxForm)
      .then(async () => {
        await router.push('/')
        await router.push(`/posts/${props.idPost}`)
      })
      .catch((error: { response: { data: { message: string } } }) => {

        if (error) {
          alert(error.response.data.message)

        }
      })
  };

  const setTimeValue = (value: any, timeType: any) => {
    let time: Record<string | number, string[] | string> | undefined =
      watch(timeType) || {}
    time! = value
    setValue(timeType, time)
    clearErrors(timeType)
    console.log(value);
  }
  return (
    <div className="">

      <div className="">
        {/*ACA EMPIEZA LO QUE HAY QUE MIGRAR*/}
        <div>
          <form noValidate onSubmit={handleSubmit(_handleSubmit)}>
            <div>
              {/*ACA*/}
              <div className='w-full flex flex-col justify-center items-start'>
                <MultiSelect
                  id='locationCenter'
                  label='Localidad'
                  register={register}
                  error={errors.locationCenter}
                  registerOptions={{
                    required: watch('locationCenter') || 'Campo requerido'
                  }}
                  props={{
                    isMulti: false,
                    options: locationCentersList,
                    setValue: setLocationValue
                  }}
                />

              </div>
              <div hidden={!watch('locationCenter')}>
                <div >
                  <Select
                    id='centerChecked'
                    label='Centro'
                    register={register}
                    handleChange={handleCenterChange}
                    options={centersRaw.filter(x => x.label.includes(locationSelected))}
                  />
                </div>
                {actualCenterSelected != undefined ?
                  <div hidden={!watch('centerChecked')}>
                    <MultiSelect
                      id='days'
                      label='Días'
                      register={register}
                      registerOptions={{
                        required:
                          !!watch('centerChecked') || 'Campo requerido'
                      }}
                      error={errors.days as unknown as FieldError}
                      props={{
                        isMulti: true,
                        options: actualCenterSelected!.dias.map(dia => ({
                          label: dia.descripcion,
                          value: dia.idDia
                        })),
                        setValue: (id: any, value: any) =>
                          setTimeValue(value, 'days')
                      }}
                    />
                    <div className='w-full flex justify-center items-center gap-4'>
                      <div className='flex flex-col basis-1/2 max-w-[50%]'>
                        <MultiSelect
                          id='from'
                          label='Desde las'
                          register={register}
                          error={errors.from as unknown as FieldError}
                          registerOptions={{
                            required:
                              !!watch('centerChecked') || 'Campo requerido',
                            validate: () => {
                              const from = Number(watch('from'))
                              const to = Number(watch('to'))
                              if (to < from) {
                                return 'La hora de inicio no puede ser mayor a la hora de fin'
                              }
                              return (
                                String(from) !== 'Seleccione un horario' ||
                                'Campo requerido'
                              )
                            }
                          }}
                          props={{
                            isMulti: false,
                            options: auxMakeHoursList(actualCenterSelected),
                            setValue: (id: any, value: any) =>
                              setTimeValue(value, 'from')
                          }}

                        />
                      </div>
                      <div className='basis-1/2 max-w-[50%]'>
                        <MultiSelect
                          id='to'
                          label='Hasta las'
                          register={register}
                          error={errors.to as unknown as FieldError}
                          registerOptions={{
                            required:
                              !!watch('centerChecked') || 'Campo requerido',
                            validate: () => {
                              const from = Number(watch('from'))
                              const to = Number(watch('to'))
                              if (from > to) {
                                alert(
                                  'La hora de fin no puede ser menor a la hora de inicio'
                                )
                                return false
                              }
                              return (
                                String(to) !== 'Seleccione un horario' ||
                                'Campo requerido'
                              )
                            }
                          }}
                          props={{
                            isMulti: false,
                            options: auxMakeHoursList(actualCenterSelected),
                            setValue: (id: any, value: any) =>
                              setTimeValue(value, 'to')
                          }}
                        />
                      </div>
                    </div>
                  </div> : <></>}
              </div>

            </div>
            {watch('locationCenter') && watch('centerChecked') && watch('days') && watch('from') && watch('to') ?
              <Button
                key='signup-form-submit-button'
                type={ButtonEnum.SUBMIT}
                disabled={watch('locationCenter') && watch('centerChecked') && watch('days') && watch('from') && watch('to') ? false : true}
                className='mt-[30px] py-[21px] w-full text-white rounded-lg bg-rose-700 font-semibold hover:bg-rose-700 duration-100'
              >
                Confirmar
              </Button> :
              <Button
                key='signup-form-submit-button'
                type={ButtonEnum.SUBMIT}
                disabled={true}
                className='mt-[30px] py-[21px] w-full text-white rounded-lg bg-rose-700 font-semibold hover:bg-rose-700 duration-100'
              >
                Confirmar
              </Button>
            }
          </form>
        </div>
      </div>
    </div>

  );
}
