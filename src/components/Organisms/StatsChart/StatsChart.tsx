import { TextFormatOutputType } from '@site/src/utils/textFormat';
import { Board } from '../../Atoms/Board';
import { PoolStatisticsTitle } from '@site/src/components/Molecules/PictureTitles';
import { Spacer } from '../../Atoms/Spacer';
import styles from "./styles.module.css";
import clsx from 'clsx';

interface IStatsChart{
  radialBarChart: React.ReactNode
  infoItems: Array<{title: string, value: TextFormatOutputType}>

}

const StatsChart = ({radialBarChart, infoItems}:IStatsChart) => {

  return (
    <div className={styles.statsChart}>
      <div className={styles.background} />
      <PoolStatisticsTitle />
      <Spacer variant='lg' />
      <div className='row'>
        <div className='col col--8'>
          {radialBarChart}
        </div>
        <div className={clsx(["col col--4", styles.infoBoxStatsChart])}>
          {infoItems?.map((info, index) => (
            <>
            <Board key={index} description={info?.title} value={info?.value.text}
                suffix={info?.value.suffix} prefix={info?.value.prefix} /> 
                <Spacer variant='xl' />       
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsChart
