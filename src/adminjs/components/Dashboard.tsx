// src/adminjs/components/Dashboard.tsx

import React, { useEffect, useState } from 'react'
import { H1, H2, Table, TableHead, TableBody, TableRow, TableCell } from '@adminjs/design-system'
import { ApiClient, useCurrentAdmin } from 'adminjs'

export default function Dashboard() {
  const [resources, setResources] = useState<{ [key: string]: number }>()
    const [currentAdmin] = useCurrentAdmin()
  //apiClient serve para bater no nosso index.ts do adminjs
  const api = new ApiClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  //usando o metodo getDashboard() para capturar o handler que declaramos 
  async function fetchDashboardData() {
    const res = await api.getDashboard()
    setResources(res.data)
  }

  return (
    <section style={{ padding: '1.5rem' }}>
      {/* Se o currentAdmin existir, iremos mostrar o nome dele na tela   */}
      <H1>Seja bem-vindo(a), {currentAdmin?.firstName}</H1>

      <section style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
        <H2>Resumo</H2>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FF0043' }}>
              <TableCell style={{ color: "#FFF" }}>Recurso</TableCell>
              <TableCell style={{ color: "#FFF" }}>Registros</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            //Se o resources não tiver nenhum conteudo, não irá retornar nada. Porem se tiver, o Object.entries irá usar o map para criar uma linha para cada resources
              resources ?
                Object.entries(resources).map(([resource, count]) => (
                  <TableRow key={resource}>
                    <TableCell>{resource}</TableCell>
                    <TableCell>{count}</TableCell>
                  </TableRow>
                ))
                :
                <></>
            }
          </TableBody>
        </Table>
      </section>
    </section>
  )
}