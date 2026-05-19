/**
 * Component/Function  Error Conn.
 * Used to render or handle logic for ErrorConn.
 */
const ErrorConn = () => {
  return (
    <div className="flex h-1/2 flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Request TimeOut...</h1>
      <p>anda perlu menghidupi koneksi...</p>
      <p className="text-center">
        jika merasa sudah menghidupi koneksi dan error , kesalahan berasal dari
        server...
      </p>
    </div>
  );
};

export default ErrorConn;
