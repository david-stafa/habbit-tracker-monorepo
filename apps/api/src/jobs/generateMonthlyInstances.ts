// import { boss } from './boss'

// const QUEUE = 'generate-monthly-instances'

// export async function registerGenerateMonthlyInstancesJob() {
//   await boss.createQueue(QUEUE)
//   await boss.schedule(QUEUE, '0 0 1 * *', {})
//   await boss.work(QUEUE, async ([job]) => {
//     console.log('Generating monthly habit instances...', job)
//   })
// }
