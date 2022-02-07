import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { LogoutUser } from "../../actions/account"
import { Button } from '../'
import {
  ButtonsContainer,
  Container,
  Logo,
  Title,
  TitleContainer,
  Label,
} from './styled'
import styled from 'styled-components'
import _ from 'lodash'
import { useTable } from 'react-table'

const Styles = styled.div`
  padding: 1rem;
  a {
    text-decoration: none;
    color: black;
  }
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  let row = cell.row.original
                  return <td {...cell.getCellProps()}>
                    {_.isEmpty(row.walker) ?
                      <Link
                        to={{
                          pathname: "/details",
                          state: row
                        }}>
                        {cell.render('Cell')}
                      </Link>
                      : cell.render('Cell')
                    }
                  </td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Styles>
  )
}

export default Table