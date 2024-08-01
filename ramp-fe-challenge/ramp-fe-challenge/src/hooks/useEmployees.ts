import { useCallback, useState, useEffect } from "react";
import { Employee } from "../utils/types";
import { useCustomFetch } from "./useCustomFetch";
import { EmployeeResult } from "./types";

export function useEmployees(): EmployeeResult {
  const { fetchWithCache, loading } = useCustomFetch();
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [employeesLoading, setEmployeesLoading] = useState<boolean>(true);

  const fetchAll = useCallback(async () => {
    setEmployeesLoading(true);
    const employeesData = await fetchWithCache<Employee[]>("employees");
    setEmployees(employeesData);
    setEmployeesLoading(false);
  }, [fetchWithCache]);

  const invalidateData = useCallback(() => {
    setEmployees(null);
    setEmployeesLoading(true);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { data: employees, loading: employeesLoading, fetchAll, invalidateData };
}
