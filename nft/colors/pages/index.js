import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { Component } from 'react';
import Navbar from '../components/Navbar'
import Layout from '../components/Layout';


class Colors extends Component {
  render() {
    return (
        <Layout>
          <div>Colors</div>
        </Layout>
    );
  }
}

export default Colors;
