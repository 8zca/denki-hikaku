import React from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'
import { calcLpio, calcTepco, calcLooop, calcAshita, calcRakuten, calcTokyu } from '@/utils/calculatePrice'

const Graph: React.FC = (): JSX.Element => (
  <Wrapper>
        <ResponsiveLine
            data={makeData()}
            margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
            xScale={{ type: 'linear' }}
            yScale={{ type: 'linear', stacked: false }}
            curve="monotoneX"
            axisTop={null}
            // axisBottom={{
            //     tickValues: [
            //         0,
            //         20,
            //         40,
            //         60,
            //         80,
            //         100,
            //         120
            //     ],
            //     tickSize: 5,
            //     tickPadding: 5,
            //     tickRotation: 0,
            //     format: '.2f',
            //     legend: 'price',
            //     legendOffset: 36,
            //     legendPosition: 'middle'
            // }}
            // axisLeft={{
            //     tickValues: [
            //         0,
            //         500,
            //         1000,
            //         1500,
            //         2000,
            //         2500
            //     ],
            //     tickSize: 5,
            //     tickPadding: 5,
            //     tickRotation: 0,
            //     format: '.2s',
            //     legend: 'volume',
            //     legendOffset: -40,
            //     legendPosition: 'middle'
            // }}
            enableGridX={false}
            colors={{ scheme: 'spectral' }}
            lineWidth={1}
            pointSize={4}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={1}
            pointBorderColor={{ from: 'serieColor' }}
            enablePointLabel={false}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            // gridXValues={[ 0, 20, 40, 60, 80, 100, 120 ]}
            // gridYValues={[ 0, 500, 1000, 1500, 2000, 2500 ]}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 140,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 12,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
  </Wrapper>
)

interface Item { id: string, data: Array<{ x: number, y:number }> }
const makeData = () => {
  const data: Array<Item> = []
  const amp = 50
  
  const services = ['Lpio', 'Tepco', 'Looop', 'Ashita', 'Rakuten', 'Tokyu']
  services.forEach(s => {
    const row: Item = {
      id: s,
      data: []
    }

    for (let kwh = 10; kwh <= 500; kwh += 10) {
      let y
      if (s === 'Lpio') {
        y = calcLpio(amp, kwh)
      } else if (s === 'Tepco') {
        y = calcTepco(amp, kwh)
      } else if (s === 'Looop') {
        y = calcLooop(amp, kwh)
      } else if (s === 'Ashita') {
        y = calcAshita(amp, kwh)
      } else if (s === 'Rakuten') {
        y = calcRakuten(amp, kwh)
      } else {
        y = calcTokyu(amp, kwh)
      }
      row.data.push({ x: kwh, y })
    }
    data.push(row)
  })

  return data
}

export default Graph

const Wrapper = styled.div`
  height:80vh;
  width:100vw;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`